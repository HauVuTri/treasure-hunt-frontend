import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const DrawerMenu = ({ open, onClose, onLogout }) => {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Logout', icon: <LogoutIcon />, action: onLogout }, // Attach the logout function
  ];

  return (
    <Drawer open={open} onClose={onClose} variant="temporary" sx={{ width: 240 }}>
      <Toolbar />
      <Box sx={{ width: 240, role: 'presentation' }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={item.action || onClose}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
