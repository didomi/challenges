import { Stack, Typography } from '@mui/material';
import { ErrorMessage } from '@/components';
import { CONSENTS_TOTAL_QK, useConsentsQuery } from '../../hooks';
import { ConsentsTable } from '../../components';
import { useQueryState, parseAsInteger } from 'nuqs';
import { useQueryClient } from '@tanstack/react-query';

export default function ConsentsPage() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const pageSize = 2;
  const qc = useQueryClient();

  const {
    data: consents = { data: [], total: 0, page: 1, pageSize },
    isLoading: isConsentsLoading,
    isFetching: isConsentsFetching,
    isError: isConsentsError,
    refetch: refetchConsents,
    error: consentsError,
  } = useConsentsQuery({ page, pageSize });

  if (!isConsentsLoading && (isConsentsError || !consents)) return (
    <ErrorMessage
      title="Failed to load"
      message={(consentsError as Error)?.message || 'Unable to load consents'}
      retry={refetchConsents}
    />
  );

  // Try to get total from cache, fallback to fetched total
  const total = qc.getQueryData<number>([CONSENTS_TOTAL_QK]) ?? consents.total;

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Collected Consents</Typography>
      <ConsentsTable
        consents={consents.data}
        totalItems={total}
        page={page}
        pageSize={pageSize}
        isLoading={isConsentsLoading || isConsentsFetching}
        onPageChange={setPage}
      />
    </Stack>
  );
}