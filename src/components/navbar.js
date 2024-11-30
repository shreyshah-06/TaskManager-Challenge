import React  from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box, Avatar, IconButton, Menu, MenuItem, Tooltip, Badge } from '@mui/material';

const Navbar = () => {
    const userName = localStorage.getItem('userName');
    const imageUrl = localStorage.getItem('imageUrl');
    const isLoggedIn = !!userName;
    const firstName = userName ? userName.split(' ')[0] : '';
  const handleLogout = () => {
    // Remove the userName and token from localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{ mr: 2, color: 'white', fontWeight: 'bold' }}
            >
              Hello, {firstName}
            </Typography>
            {imageUrl && (
              <Avatar
                src={imageUrl}
                alt={userName}
                sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 2,
                  border: '2px solid white'
                }}
              />
            )}
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Link
              href="/login"
              underline="none"
              sx={{
                mx: 1,
                color: window.location.pathname === '/login' ? 'white' : '#ddd',
                fontWeight: 'bold',
                '&:hover': { color: 'white' },
              }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              underline="none"
              sx={{
                mx: 1,
                color: window.location.pathname === '/signup' ? 'white' : '#ddd',
                fontWeight: 'bold',
                '&:hover': { color: 'white' },
              }}
            >
              Sign Up
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
