import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { createConsent } from '../api/data-access';
import type { Consent, ConsentInput } from '../types';
import { CONSENTS_QK, CONSENTS_TOTAL_QK } from './keys';

export function useCreateConsentMutation(): UseMutationResult<Consent, Error, ConsentInput> {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createConsent,
    onSuccess: () => {
      // Invalidate consents list to refetch
      qc.invalidateQueries({ queryKey: [CONSENTS_QK] });
      // Optimistically increment total count in cache
      qc.setQueryData([CONSENTS_TOTAL_QK], (prevTotal: number) => (prevTotal || 0) + 1);
    }
  });
}
