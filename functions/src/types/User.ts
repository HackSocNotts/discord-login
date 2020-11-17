import { AccessTokenObject } from './Discord';

export interface User {
  uid: string;
  ticketSlug: string;
  ticketReference: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  verified: boolean;
  ticketUrl: string;
  ticketReleaseTitle: string;
  ticketReleaseId: number;
  verificationStarted: boolean;
}

export type EncryptedUser = User;
export type EmptyUser = Pick<User, 'uid'>;

export interface UserWithAccessToken extends User {
  accessToken: AccessTokenObject;
}
