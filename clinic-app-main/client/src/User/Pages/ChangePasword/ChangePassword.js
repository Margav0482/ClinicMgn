import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import { updatePassword } from '../../Redux/Action/userAction';
import { CLEAR_ERROR } from '../../Redux/Action/ActionTypes';
import Header from "../../components/Header/Header";

const ChangePassword = () => {

    const dispatch = useDispatch();

    const [click, setClick] = useState(false);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState({
        oldpassword: '',
        password: '',
        cpassword: ''
    });

    const { error, success } = useSelector((state) => state.userStore);

    const validate = () => {
        if (data.password === "" || data.cpassword === "" || data.oldpassword === "") {
            setClick(true);
            return false;
        } else {
            if (data.password !== data.cpassword) {
                setMsg("password and confirm password not match");
                return false;
            } else {
                return true;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            dispatch(updatePassword(data));
        }
    };
    useEffect(() => {
        if (success) {
            message.success("Password Update");
            setData({ oldpassword: '', password: '', cpassword: '' });
            setClick(false);
            dispatch({ type: CLEAR_ERROR });
        }
    }, [success])


    return (
        <div>
            <Header headerPages={["dashboard", 'appoinment']} />
        <Container component="main" maxWidth="xs">
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
                    Change Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Old Password"
                                name="password"
                                autoFocus
                                type="password"
                                value={data.oldpassword}
                                onChange={(e) => setData({ ...data, oldpassword: e.target.value })}
                                error={click && data?.oldpassword === ""}
                                helperText={click && data?.oldpassword === "" ? 'Please Enter OldPassword' : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="New Password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                error={click && data?.password === ""}
                                helperText={click && data?.password === "" ? 'Please Enter Password' : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="cpassword"
                                label="Confrim New Password"
                                name="cpassword"
                                type="password"
                                value={data.cpassword}
                                onChange={(e) => setData({ ...data, cpassword: e.target.value })}
                                error={click && data?.cpassword === ""}
                                helperText={click && data?.cpassword === "" ? 'Please Enter Confrim Password' : ""}
                            />
                        </Grid>
                        <span className='error'>
                            {error || msg}
                        </span>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Container>
        </div>
    )
}

export default ChangePassword;