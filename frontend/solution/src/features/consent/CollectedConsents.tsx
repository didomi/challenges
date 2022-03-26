import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { IConsent } from './contracts';
import { AppDispatch, RootState } from '../../store';
import { consentsChangePage } from './slice';

const PAGE_SIZE = 2;

function CollectedConsents() {
  const dispatch = useDispatch<AppDispatch>();

  const consents = useSelector((state: RootState) => {
    const start = (state.consents.page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return state.consents.list.slice(start, end);
  });

  const currentPage = useSelector((state: RootState) => {
    return state.consents.page;
  });

  const totalPages = useSelector((state: RootState) => {
    return Math.ceil(state.consents.list.length / PAGE_SIZE);
  });

  const formatStatus = (consent: IConsent): string => {
    let status = '';

    if (consent.newsletters) {
      status += 'Receive newsletters';
    }

    if (consent.ads) {
      if (status.length) {
        status += ', ';
      }

      status += 'Be shown targeted ads';
    }

    if (consent.stats) {
      if (status.length) {
        status += ', ';
      }

      status += 'Contribute to anonymous visit statistics';
    }

    return status;
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20%' }}>Name</TableCell>
              <TableCell sx={{ width: '25%' }}>Email</TableCell>
              <TableCell>Consents given for</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consents.length ? (
              consents.map((consent) => (
                <TableRow key={consent.id}>
                  <TableCell>{consent.name}</TableCell>
                  <TableCell>{consent.email}</TableCell>
                  <TableCell>{formatStatus(consent)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                  No record exists, <Link to="/give-consent">click here</Link>{' '}
                  to create new
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container alignContent="center" justifyContent="center">
        <Grid item>
          <Pagination
            sx={(theme) => ({ my: theme.spacing(2) })}
            page={currentPage}
            count={totalPages}
            onChange={(_, page) => {
              dispatch(consentsChangePage({ page }));
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CollectedConsents;
