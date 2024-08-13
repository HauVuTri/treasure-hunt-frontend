import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ username, onMenuClick }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Treasure Hunt App
        </Typography>
        {username && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {username}
            </Typography>
            <Avatar>{username[0].toUpperCase()}</Avatar>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
