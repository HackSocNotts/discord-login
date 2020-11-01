import { AccessTokenObject } from '../types/Discord';
import AES from 'crypto-js/aes';
import { config } from 'firebase-functions';

const KEY = config().discord.token_key;

export const encryptAccessTokenObject = (accessToken: AccessTokenObject): AccessTokenObject => {
  const encrypted: AccessTokenObject = {
    ...accessToken,
    access_token: AES.encrypt(accessToken.access_token, KEY).toString(),
    refresh_token: AES.encrypt(accessToken.refresh_token, KEY).toString(),
  };

  return encrypted;
};

export const decryptAccessTokenObject = (accessToken: AccessTokenObject): AccessTokenObject => {
  const decrypted: AccessTokenObject = {
    ...accessToken,
    access_token: AES.decrypt(accessToken.access_token, KEY).toString(CryptoJS.enc.Utf8),
    refresh_token: AES.decrypt(accessToken.refresh_token, KEY).toString(CryptoJS.enc.Utf8),
  };

  return decrypted;
};
