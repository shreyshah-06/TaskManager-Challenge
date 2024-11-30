import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Link, Box, InputAdornment, Typography, IconButton  } from '@mui/material';
import Navbar from '../components/navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to the server
      await axios.post('https://taskmanager-challenge.onrender.com/api/auth/signup', {
        name,
        email,
        password,
      });

      // Handle success
      toast.success('Signup successful!', {
        position: 'top-right',
      });

      // Redirect to login page upon successful signup
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);

    } catch (error) {
      // Handle errors from backend response
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.msg || 'An error occurred, please try again.', {
          position: 'top-right',
        });
      } else {
        toast.error('Network error or server issue', {
          position: 'top-right',
        });
      }
    }
  };

  return (
    <Box>
      <Navbar/>
      {/* Signup Form */}
      <Container maxWidth="xs" sx={{ mt: { xs: 4, sm: 8 } }}>
        <Box
          sx={{
            padding: { xs: 2, sm: 4 },
            borderRadius: 2,
            boxShadow: 3,
            border: '1px solid #ddd',
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" component="div" sx={{ mb: 3, textAlign: 'center' }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ backgroundColor: '#1976d2' }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    sx={{
                      color: '#1976d2',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ backgroundColor: '#1976d2' }}
                  onClick={() => window.location.href = "https://taskmanager-challenge.onrender.com/api/auth"}
                >
                  Sign Up with Google
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default SignupPage;
