import { Link, resolvePath, useLocation } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Nav() {
  const location = useLocation();

  const isActiveRoute = (path: string): boolean => {
    const resolved = resolvePath(path);

    return location.pathname === resolved.pathname;
  };

  return (
    <Paper>
      <List
        component="nav"
        sx={{
          '& a': {
            color: 'text.primary',
            textDecoration: 'none'
          }
        }}
      >
        <Link to="/give-consent">
          <ListItem button selected={isActiveRoute('/give-consent')}>
            <ListItemText primary="Give Consent" />
          </ListItem>
        </Link>
        <Link to="/collected-consents">
          <ListItem button selected={isActiveRoute('/collected-consents')}>
            <ListItemText primary="Collected Consents" />
          </ListItem>
        </Link>
      </List>
    </Paper>
  );
}

export default Nav;
