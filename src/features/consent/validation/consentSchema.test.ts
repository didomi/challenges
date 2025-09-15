import { describe, it, expect } from 'vitest';
import { consentSchema } from './consentSchema';

describe('consentSchema', () => {
  it('rejects invalid email', () => {
    const res = consentSchema.safeParse({ name: 'A', email: 'bad', consentTypes: ['email'] });
    expect(res.success).toBe(false);
  });
  it('accepts valid data', () => {
    const res = consentSchema.safeParse({ name: 'Alice', email: 'a@b.com', consentTypes: ['sms'] });
    expect(res.success).toBe(true);
  });
});
