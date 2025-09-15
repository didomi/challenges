import { keepPreviousData, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { PaginatedResult } from '@/types/data-access';
import { listConsents } from '../api/data-access';
import type { Consent, GetConsentsQuery } from '../types';
import { CONSENTS_QK, CONSENTS_TOTAL_QK } from './keys';

export function useConsentsQuery(params: Required<GetConsentsQuery>): UseQueryResult<PaginatedResult<Consent>, Error> {
  const qc = useQueryClient();
  const { page, pageSize } = params;
  return useQuery({
    queryKey: [CONSENTS_QK, page, pageSize],
    queryFn: async () => {
      const data = await listConsents({ page, pageSize });
      // Update total count in cache
      qc.setQueryData([CONSENTS_TOTAL_QK], data.total);
      return data;
    },
    placeholderData: keepPreviousData,
  });
}
