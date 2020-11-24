import { validatePhoneNumber } from '../services/twilio';

export const sanitizePhone = async (phoneNumber: string): Promise<string> => {
  const trimmedPhoneNumber = phoneNumber.replace(/\s/g, '');

  if (trimmedPhoneNumber.substr(0, 1) === '+') {
    return trimmedPhoneNumber;
  }

  if (trimmedPhoneNumber.substr(0, 1) === '0') {
    return `+44${trimmedPhoneNumber.substr(1)}`;
  }

  try {
    const fixedNumber = `+${trimmedPhoneNumber}`;
    if ((await validatePhoneNumber(fixedNumber)) === fixedNumber) {
      return fixedNumber;
    }

    throw new Error('Invalid Phone Number. Must be E.164 Formatted');
  } catch (e) {
    throw new Error('Invalid Phone Number. Must be E.164 Formatted');
  }
};
