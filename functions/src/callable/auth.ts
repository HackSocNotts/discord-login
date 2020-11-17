import { CallableContext, HttpsError } from 'firebase-functions/lib/providers/https';
import { getUser } from '../services/db';

export const getUserProfile = async (
  _: void,
  context: CallableContext,
): Promise<{ email: string; fullName: string; phoneNumber: string }> => {
  try {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Not authenticated');
    }

    const { uid } = context.auth;

    const user = await getUser(uid);

    if (!user.email || !user.fullName || !user.phoneNumber) {
      throw new HttpsError('permission-denied', 'Missing required data');
    }

    const { email, fullName, phoneNumber } = user;

    return {
      email,
      fullName,
      phoneNumber,
    };
  } catch (e) {
    if (e instanceof HttpsError) {
      throw e;
    }
    console.error(e);
    throw new HttpsError('internal', e.getMessage());
  }
};
