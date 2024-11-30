import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  Link,
  Box,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../components/navbar";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/api/auth/login", credentials)
      .then((response) => {
        console.log("Login successful:", response.data);

        // Extract token and user name from the response
        const token = response.data.token;
        const userName = response.data.user.name;
        const profilePicture = response.data.profilePicture

        // Save token and user name in local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", userName);
        localStorage.setItem("imageUrl", profilePicture);
        toast.success("Login successful!", {
          position: "top-right",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          toast.error(
            error.response.data.msg || "An error occurred, please try again.",
            {
              position: "top-right",
            }
          );
        } else {
          toast.error("Network error or server issue", {
            position: "top-right",
          });
        }
      });
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Container maxWidth="xs" sx={{ mt: { xs: 4, sm: 8 } }}>
        <Box
          sx={{
            padding: { xs: 2, sm: 4 },
            borderRadius: 2,
            boxShadow: 3,
            border: "1px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
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
                  style={{ backgroundColor: "#1976d2" }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    sx={{
                      color: "#1976d2",
                      fontWeight: "bold",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ backgroundColor: "#1976d2" }}
                >
                  Login with Google
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

export default LoginPage;
