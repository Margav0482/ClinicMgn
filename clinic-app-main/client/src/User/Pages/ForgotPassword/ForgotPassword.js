import React from 'react';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import EmailVerify from './EmailVerify/EmailVerify';
import OtpVerify from './OtpVerify/OtpVerify';
import ChangePassword from './ChangePassword/ChangePassword';

import './ForgotPassword.css';
import Header from "../../components/Header/Header";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Clinic App
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const ForgotPassword = () => {

  const email = localStorage.getItem('key1');
  const temp_token = localStorage.getItem('key2');

  return (
      <div>
          <Header headerPages={["dashboard", 'appoinment']} />
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
            Forgot Password
          </Typography>
          {email ? email && temp_token ? <ChangePassword /> : <OtpVerify /> : <EmailVerify />}

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
      </div>
  );
}

export default ForgotPassword;