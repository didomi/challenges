export interface IConsent {
  id: string;
  enabled: boolean;
}

export interface IUser {
  id: string;
  email: string;
  consents: IConsent[];
}
