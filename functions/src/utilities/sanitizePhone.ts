export const sanitizePhone = (phoneNumber: string): string => {
  const trimmedPhoneNumber = phoneNumber.replace(/\s/g, '');

  if (trimmedPhoneNumber.substr(0, 1) === '+') {
    return trimmedPhoneNumber;
  }

  if (trimmedPhoneNumber.substr(0, 1) === '0') {
    return `+44${trimmedPhoneNumber.substr(1)}`;
  }

  throw new Error('Invalid Phone Number. Must be E.164 Formatted');
};
