import { config } from 'firebase-functions';
import Twilio from 'twilio';
import { VerificationStatus } from '../types/Twilio';

const client = Twilio(config().twilio.account_sid, config().twilio.auth_token);

const verifyClientService = () => client.verify.services(config().twilio.verify_service_id);

/**
 * Uses the Twilio lookup API to validate a provided phone number
 *
 * @param phone E.164 Formatted phone number
 * @returns E.165 formatted phone number if valid, other wise returns null
 */
export const validatePhoneNumber = async (phone: string): Promise<string | null> => {
  try {
    const result = await client.lookups.phoneNumbers(phone).fetch();
    return result.phoneNumber ? result.phoneNumber : null;
  } catch (e) {
    return null;
  }
};

/**
 * Uses the Twilio verifications api to start an sms verification
 *
 * @param to E.164 Phone Number
 * @returns promise containing the verification sid
 */
export const startVerifyViaSms = async (to: string): Promise<string> => {
  try {
    const { sid } = await verifyClientService().verifications.create({
      locale: 'en-GB',
      to,
      channel: 'sms',
    });
    return sid;
  } catch (e) {
    throw e;
  }
};

/**
 * Checks the status of the twilio verification attempt
 *
 * @param sid Verification sid
 * @returns the verification status
 */
export const getVerificationStatus = async (sid: string): Promise<VerificationStatus> => {
  try {
    const { status } = await verifyClientService().verifications(sid).fetch();
    return status as VerificationStatus;
  } catch (e) {
    throw e;
  }
};

/**
 * Validates a code against the provided sid
 *
 * @param sid verification sid
 * @param code user provided code
 * @returns the verification status
 */
export const checkVerification = async (sid: string, code: string): Promise<VerificationStatus> => {
  try {
    const { status } = await verifyClientService().verificationChecks.create({
      verificationSid: sid,
      code,
    });

    return status as VerificationStatus;
  } catch (e) {
    throw e;
  }
};
