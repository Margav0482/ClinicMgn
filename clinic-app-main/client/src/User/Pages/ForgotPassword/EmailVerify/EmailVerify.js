import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { checkEmailExists } from '../../../Redux/Action/userAction';
import { encryptData } from '../../../../utils/util';

const EmailVerify = () => {

    const dispatch = useDispatch();

    const [click, setClick] = useState(false);
    const [data, setData] = useState({
        email: '',
    });

    const { error, success } = useSelector((state) => state.userStore);

    const validate = () => {
        if (data.email === "") {
            setClick(true);
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            dispatch(checkEmailExists(data));
        }
    };

    useEffect(() => {
        if (success) {
            const encryptedData = encryptData(data.email);
            localStorage.setItem('key1', encryptedData);
            window.location.reload();
            message.success("Email Verify succuess");
        }
    }, [success])


    return (
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
            <span className='error'>
                {error}
            </span>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Forgot Password
            </Button>
            <Grid container>
                <Grid item>
                    <NavLink to="/" variant="body2">
                        {"Already have an account? Sign in"}
                    </NavLink>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EmailVerify;