import { z } from 'zod';

/*
  Validation schema for the consent form using Zod
  - name: required, string, 2-100 characters
  - email: required, valid email format
  - consentTypes: required, array of strings, at least one selected
*/
export const consentSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  consentTypes: z.array(z.string()).min(1, 'Select at least one consent type'),
});

export type ConsentFormValues = z.infer<typeof consentSchema>;
