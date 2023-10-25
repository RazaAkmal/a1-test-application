import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Toolbar, Typography } from '@mui/material';

const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface AppDrawerProps {
  children: React.ReactNode;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    localStorage.removeItem('accessToken')
    navigate('/')
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <img src="/icon/menu.svg" alt="" />
            </IconButton>
            <Typography sx={{color: 'black', cursor: 'pointer'}} variant="h6" onClick={handleLogOut}>Logout</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{ justifyContent: 'flex-start' }}>
            <IconButton onClick={handleDrawerClose}>
              <img src="/icon/menu.svg" alt="" />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Action Required', path: '/compliance' },
              { text: 'Completed Application', path: '/completed-application' },
              { text: 'Map View', path: '/map-view' },
              { text: 'Setting', path: '/setting' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>
                    {index === 0 && <img src="/icon/ActionRequired.svg" alt="" />}
                    {index === 1 && <img src="/icon/CompletedCompliance.svg" alt="" />}
                    {index === 2 && <img src="/icon/MapView.svg" alt="" />}
                    {index === 3 && <img src="/icon/Setting.svg" alt="" />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
  );
};

export default AppDrawer;
