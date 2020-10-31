import { Optional } from './utils';

export interface User {
  uid: string;
  ticketSlug: string;
  ticketReference: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  discordSnowflake: Optional<string>;
  verified: boolean;
}

export type UserWithoutID = Omit<User, 'uid'>;
