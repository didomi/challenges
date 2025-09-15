import { type PaginatedResult } from '@/types/data-access';

export interface ConsentInput {
  name: string;
  email: string;
  consentTypes: ConsentType['name'][];
}

export interface Consent extends ConsentInput {
  id: string;
  createdAt: string;
}

export type ConsentType = {
  name: string;
  label: string;
}

export type GetConsentsQuery = Pick<PaginatedResult<Consent>, 'page' | 'pageSize'>;
