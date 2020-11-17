import { EncryptedUser, User } from '../types/User';
import AES from 'crypto-js/aes';
import { config } from 'firebase-functions';
import CryptoJS from 'crypto-js';

const KEY = config().app.user_data_key;
const encrypt = config().app.encrypt_user_data === 'true';

export const encryptUserData = (user: Partial<User>): Partial<EncryptedUser> => {
  if (!encrypt) {
    return user;
  }

  const encrypted: Partial<EncryptedUser> = {
    ...user,
    ...(user.phoneNumber && { phoneNumber: AES.encrypt(user.phoneNumber, KEY).toString() }),
    ...(user.email && { email: AES.encrypt(user.email, KEY).toString() }),
    ...(user.firstName && { firstName: AES.encrypt(user.firstName, KEY).toString() }),
    ...(user.lastName && { lastName: AES.encrypt(user.lastName, KEY).toString() }),
    ...(user.fullName && { fullName: AES.encrypt(user.fullName, KEY).toString() }),
  };

  return encrypted;
};

export const decryptUserData = (user: Partial<EncryptedUser>): Partial<User> => {
  if (!encrypt) {
    return user;
  }

  const decrypted: Partial<User> = {
    ...user,
    ...(user.phoneNumber && { phoneNumber: AES.decrypt(user.phoneNumber, KEY).toString(CryptoJS.enc.Utf8) }),
    ...(user.email && { email: AES.decrypt(user.email, KEY).toString(CryptoJS.enc.Utf8) }),
    ...(user.firstName && { firstName: AES.decrypt(user.firstName, KEY).toString(CryptoJS.enc.Utf8) }),
    ...(user.lastName && { lastName: AES.decrypt(user.lastName, KEY).toString(CryptoJS.enc.Utf8) }),
    ...(user.fullName && { fullName: AES.decrypt(user.fullName, KEY).toString(CryptoJS.enc.Utf8) }),
  };

  return decrypted;
};
