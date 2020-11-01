export type AccessTokenObject = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
};

export class InvalidCodeError extends Error {}
export class NoAccessTokenError extends Error {}
export class ExpiredAccessTokenError extends Error {}
