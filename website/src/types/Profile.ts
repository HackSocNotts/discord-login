export interface Profile {
  name?: string;
  email: string;
}

export interface FullProfile extends Profile {
  verified: boolean;
}
