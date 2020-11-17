import { CallableContext, HttpsError } from 'firebase-functions/lib/providers/https';
import { checkVerification, startVerifyViaSms } from '../services/twilio';
import { getUser, updateUser } from '../services/db';
import { config } from 'firebase-functions';
import { VerificationStatus } from '../types/Twilio';

const verify_active = config().twilio.verify_active === 'true';

export const startVerification = async (_: void, context: CallableContext): Promise<void> => {
  try {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Not authenticated');
    }

    if (!verify_active) {
      throw new HttpsError('permission-denied', 'Verification disabled. Please refresh your ticket.');
    }

    const { uid } = context.auth;

    const user = await getUser(uid);

    if (!user.phoneNumber) {
      throw new HttpsError('permission-denied', 'No ticket assigned to user');
    }

    await startVerifyViaSms(user.phoneNumber);

    await updateUser(uid, { verificationStarted: true });
  } catch (e) {
    if (e instanceof HttpsError) {
      throw e;
    }
    console.error(e);
    throw new HttpsError('internal', e.getMessage());
  }
};

export const tryVerification = async (code: string, context: CallableContext): Promise<boolean> => {
  try {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Not authenticated');
    }

    if (!verify_active) {
      throw new HttpsError('permission-denied', 'Verification disabled. Please refresh your ticket.');
    }

    const { uid } = context.auth;

    const user = await getUser(uid);

    if (!user.phoneNumber) {
      throw new HttpsError('permission-denied', 'No ticket assigned to user');
    }

    const status = await checkVerification(user.phoneNumber, code);

    if (status === VerificationStatus.APPROVED) {
      await updateUser(uid, {
        verified: true,
        verificationStarted: false,
      });

      return true;
    }

    return false;
  } catch (e) {
    if (e instanceof HttpsError) {
      throw e;
    }
    console.error(e);
    throw new HttpsError('internal', e.getMessage());
  }
};
