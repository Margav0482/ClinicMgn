import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { message } from 'antd';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { signUp } from '../../Redux/Action/userAction';

import './SignUp.css';
import Header from "../../components/Header/Header";

function Copyright(props) {
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

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [click, setClick] = useState(false);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState({
        name: '',
        age: '',
        date: moment().format('YYYY-MM-DD'),
        email: '',
        password: '',
        cpassword: ''
    });

    const { error, success } = useSelector((state) => state.userStore);

    const validate = () => {
        if (data.name === "" || data.age === "" || data.date === "" || data.email === "" || data.password === "" || data.cpassword === "") {
            setClick(true);
            return false;
        } else {
            if (data.password === data.cpassword) {
                setMsg("");
                return true;
            } else {
                setMsg("Password And Confrim Password Does't Match");
                return false
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            dispatch(signUp(data));
        }
    };

    useEffect(() => {
        if (success) {
            message.success("Registration succuess");
            history.push('/dashboard');
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    autoFocus
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    error={click && data?.name === ""}
                                    helperText={click && data?.name === "" ? 'Please Enter Name' : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    value={data.age}
                                    onChange={(e) => setData({ ...data, age: e.target.value })}
                                    error={click && data?.age === ""}
                                    helperText={click && data?.age === "" ? 'Please Enter Age' : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="date"
                                    label="Date"
                                    name="date"
                                    disabled
                                    value={data.date}
                                    onChange={(e) => setData({ ...data, date: e.target.value })}
                                    error={click && data?.date === ""}
                                    helperText={click && data?.date === "" ? 'Please Enter Date' : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    error={click && data?.email === ""}
                                    helperText={click && data?.email === "" ? 'Please Enter Email' : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    error={click && data?.password === ""}
                                    helperText={click && data?.password === "" ? 'Please Enter Password' : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="cpassword"
                                    label="Confrim Password"
                                    type="password"
                                    id="cpassword"
                                    value={data.cpassword}
                                    onChange={(e) => setData({ ...data, cpassword: e.target.value })}
                                    error={click && data?.cpassword === ""}
                                    helperText={click && data?.cpassword === "" ? 'Please Enter Confrim Password' : ""}
                                />
                            </Grid>
                            <span className='error'>
                                {msg || error}
                            </span>
                            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/" variant="body2">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
        </div>
    );
}

export default SignUp;