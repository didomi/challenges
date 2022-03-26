import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Api from './api';

import Nav from './Nav';
import GiveConsent from './features/consent/GiveConsent';
import CollectedConsents from './features/consent/CollectedConsents';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar
          sx={{
            '& a': {
              color: 'common.white',
              textDecoration: 'none'
            }
          }}
        >
          <Typography sx={{ flexGrow: 1 }} component="h1" variant="h6">
            <Link to="/">Consent Collector</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={(theme) => ({
          mt: theme.spacing(4)
        })}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Nav />
          </Grid>
          <Grid item xs={12} md={9}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/give-consent" replace={true} />}
              />
              <Route path="/give-consent" element={<GiveConsent api={Api} />} />
              <Route
                path="/collected-consents"
                element={<CollectedConsents />}
              />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </BrowserRouter>
  );
}

export default App;
