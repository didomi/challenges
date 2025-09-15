import { v4 as uuid } from 'uuid';
import type { Consent, ConsentInput, ConsentType, GetConsentsQuery } from 'src/features/consent/types';
import { PaginatedResult } from '@/types/data-access';

/***********************
 * In-memory mock store
 ***********************/
const STORE: Consent[] = [
  {
    id: uuid(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    consentTypes: ['email', 'ads'],
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    consentTypes: ['sms'],
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    consentTypes: ['ads'],
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    name: 'Eve Adams',
    email: 'eve.adams@example.com',
    consentTypes: ['email', 'sms'],
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    consentTypes: ['email'],
    createdAt: new Date().toISOString()
  }
];

const CONSENT_TYPES: ConsentType[] = [
  { name: 'email', label: 'Receive newsletter via email' },
  { name: 'sms', label: 'Receive newsletter via SMS' },
  { name: 'ads', label: 'Targeted ads' }
];

function delay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function listConsents(q: GetConsentsQuery): Promise<PaginatedResult<Consent>> {
  await delay();
  const storeClone = [...STORE];
  const page = q.page && q.page > 0 ? q.page : 1;
  const pageSize = q.pageSize && q.pageSize > 0 ? q.pageSize : 2;
  const start = (page - 1) * pageSize;
  const slice = storeClone.slice(start, start + pageSize);

  return { data: slice, total: storeClone.length, page, pageSize };
}

export async function createConsent(input: ConsentInput): Promise<Consent> {
  await delay();
  const c: Consent = {
    id: uuid(),
    name: input.name.trim(),
    email: input.email.toLowerCase(),
    consentTypes: [...input.consentTypes],
    createdAt: new Date().toISOString()
  };
  STORE.unshift(c);
  return c;
}

export async function getAllConsentTypes() {
  await delay();
  return CONSENT_TYPES;
}

/***********************
 * Testing utilities
 ***********************/
export function __resetStore(data?: Consent[]) {
  STORE.length = 0;
  if (data) STORE.push(...data);
}
