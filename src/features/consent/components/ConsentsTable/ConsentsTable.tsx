import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack, TableContainer, Pagination, Chip, Box } from '@mui/material';
import type { Consent } from '../../types';
import { LoadingSpinner } from '@/components';
import { useConsentTypesQuery } from '@/features/consent/hooks';
import { useMemo } from 'react';

export interface ConsentsTableProps {
  consents: Consent[];
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  emptyLabel?: string;
  isLoading?: boolean;
}

export default function ConsentsTable({ consents, page, pageSize, totalItems, onPageChange, emptyLabel = 'No consents yet.', isLoading }: ConsentsTableProps) {
  const { data: consentTypes = [], isLoading: isConsentTypesLoading } = useConsentTypesQuery();

  const getConsentTypeLabels = useMemo(() => (types: string[]) => types.map((type) => {
    const consentType = consentTypes.find((t) => t.name === type);
    return consentType ? consentType.label : type;
  }), [consentTypes])

  return (
    <Stack spacing={1}>
      <TableContainer>
        {isLoading ? <LoadingSpinner label="Loading consents..." /> : (
          <Table size="medium" sx={{ border: 1, borderColor: 'grey.400', '& th, & td': { border: 1, borderColor: 'grey.300' }, width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: '25%' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '300px' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Consent given for</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography>{emptyLabel}</Typography>
                  </TableCell>
                </TableRow>
              )}
              {consents.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell sx={{ maxWidth: '300px' }}>
                    <Typography title={c.email} sx={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: '100%' }}>{c.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{
                      isConsentTypesLoading
                        ? <LoadingSpinner />
                        : getConsentTypeLabels(c.consentTypes)
                          .map(consentLabel => <Chip key={consentLabel} size='small' label={consentLabel} color="primary" variant="outlined" />)
                    }</Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Pagination
          shape="rounded"
          count={Math.ceil(totalItems / pageSize)}
          page={page}
          onChange={(_, page) => onPageChange(page)}
          sx={{
            mt: 2,
            '& > .MuiPagination-ul': {
              justifyContent: 'end',
            },
          }}
        />
      </TableContainer>
    </Stack>
  );
}
