export interface Profile {
  name?: string;
  email: string;
  uid: string;
}

export interface FullProfile extends Profile {
  verified: boolean;
}
