import { AppBar, Box, Container, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Suspense, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

export default function Layout() {
  const loc = useLocation();
  const drawerWidth = 220;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((v) => !v);

  const drawer = (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Consent Manager
      </Typography>
      <List>
        <ListItemButton component={Link} to="/" selected={loc.pathname === '/'} onClick={() => setMobileOpen(false)}>
          <ListItemText primary="Give consent" />
        </ListItemButton>
        <ListItemButton component={Link} to="/consents" selected={loc.pathname.startsWith('/consents')} onClick={() => setMobileOpen(false)}>
          <ListItemText primary="Collected Consents" />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', display: { md: 'none' } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open navigation"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ display: { xs: 'block' } }}>
            Consent Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', p: 2 }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', p: 2 }
        }}
        open
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Toolbar />
        <Container sx={{ my: 4 }}>
          <Suspense fallback={<LoadingSpinner label='Loading...' />}>
            <Outlet />
          </Suspense>
        </Container>
      </Box>
    </Box>
  );
}
