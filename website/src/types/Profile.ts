export interface Profile {
  name?: string;
  email: string;
  uid: string;
}

export interface FullProfile extends Profile {
  verified: boolean;
  uid: string;
  firstName: string;
  lastName: string;
  ticketReference: string;
  phoneNumber: string;
  fullName: string;
  ticketSlug: string;
  email: string;
  ticketUrl: string;
  ticketReleaseTitle: string;
  ticketReleaseId: number;
  verificationStarted: boolean;
  enrolled?: boolean;
}
