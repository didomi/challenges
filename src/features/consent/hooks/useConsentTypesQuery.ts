import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getAllConsentTypes } from '../api/data-access';
import type { ConsentType } from '../types';
import { CONSENT_TYPES_QK } from './keys';

export function useConsentTypesQuery(): UseQueryResult<ConsentType[], Error> {
  return useQuery({
    queryKey: [CONSENT_TYPES_QK],
    queryFn: () => getAllConsentTypes()
  });
}
