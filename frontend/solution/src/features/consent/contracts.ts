export interface IConsentCreate {
  name: string;
  email: string;
  newsletters: boolean;
  ads: boolean;
  stats: boolean;
}

export interface IConsent extends IConsentCreate {
  id: string;
}

export interface IConsentState {
  page: number;
  list: IConsent[];
}
