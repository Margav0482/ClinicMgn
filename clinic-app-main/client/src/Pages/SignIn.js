import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import jwt_encode from 'jwt-encode';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 

import './SignIn.css';
import Header from "../Admin/components/Header/Header";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Clinic App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = () => {

  const [click, setClick] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const validEmail = process.env.REACT_APP_ADMIN_ID;
  const validPwd = process.env.REACT_APP_ADMIN_PASS;
  const validToken = process.env.REACT_APP_USER_TOKEN;
  const tokenValue = process.env.REACT_APP_ADMIN_TOKEN_VALUE;

  const validate = () => {
    if (user.email === "" || user.password === "") {
      setClick(true);
      return false;
    } else {
      if (user.email === validEmail && user.password === validPwd) {
        return true;
      } else {
        setError("Invalid Email Password");
        return false
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    console.log("valid",isValid);
    if (isValid) {
      const jwt = jwt_encode({validToken:tokenValue},process.env.REACT_APP_TOKEN_KEY);
      localStorage.setItem(validToken, jwt);
      message.success("Login Success.");
      history.push('/admin');
    };
  };

  return (
      <div>
        <Header headerPages={[]} />

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              error={click && user?.email === ""}
              helperText={click && user?.email === "" ? 'Please Enter Email' : ""}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              error={click && user?.password === ""}
              helperText={click && user?.password === "" ? 'Please Enter Password' : ""}
            />
            <span className='error'>
              {error}
            </span>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
      </div>
  );
}

export default SignIn;