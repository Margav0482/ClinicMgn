import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { signIn } from '../../Redux/Action/userAction';
import { CLEAR_ERROR } from '../../Redux/Action/ActionTypes';

import './SignIn.css';
import PasswordInput from "../../../UI/FormInput/PasswordInput";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ShowAndHidePassword from "../../../UI/ShowAndHidePwd/ShowAndHidePassword";
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

const SignIn = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const email = localStorage.getItem('email');
  const temp_token = localStorage.getItem('temp_token');
  if (email || temp_token) {
    localStorage.removeItem('email');
    localStorage.removeItem('temp_token');
  }

  const [click, setClick] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const { error, success } = useSelector((state) => state.userStore);

  const validate = () => {
    if (data.email === "" || data.password === "") {
      setClick(true);
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(signIn(data));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: CLEAR_ERROR });
      history.push('/dashboard');
      message.success("Login succuess");
    }
  }, [success])

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
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              error={click && data?.email === ""}
              helperText={click && data?.email === "" ? 'Please Enter Email' : ""}
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
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              error={click && data?.password === ""}
              helperText={click && data?.password === "" ? 'Please Enter Password' : ""}
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
                <NavLink to="/forgot-password" variant="body2" >
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
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