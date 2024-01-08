import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { checkOTP } from '../../../Redux/Action/userAction';
import { decryptData, encryptData } from '../../../../utils/util';

const OtpVerify = () => {

    const dispatch = useDispatch();
    const encryptEmail = localStorage.getItem('key1');
    let email = "";
    if (encryptEmail) {
        email = decryptData(encryptEmail);
    }

    const [click, setClick] = useState(false);
    const [data, setData] = useState({
        email: email,
        otp: ''
    });

    const { error, success } = useSelector((state) => state.userStore);

    const validate = () => {
        if (data.otp === "") {
            setClick(true);
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            dispatch(checkOTP(data));
        }
    };

    useEffect(() => {
        if (success) {
            const encryptedData = encryptData(data.otp);
            localStorage.setItem('key2', encryptedData);
            window.location.reload();
            message.success("Otp Verify succuess");
        }
    }, [success])


    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                type="text"
                value={data.otp}
                onChange={(e) => setData({ ...data, otp: e.target.value })}
                error={click && data?.otp === ""}
                helperText={click && data?.otp === "" ? 'Please Enter OTP' : ""}
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
                Verify OTP
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

export default OtpVerify;