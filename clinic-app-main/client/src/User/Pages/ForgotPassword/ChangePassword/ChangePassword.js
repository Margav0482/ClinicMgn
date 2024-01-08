import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { message } from 'antd';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { changePassword } from '../../../Redux/Action/userAction';
import { CLEAR_ERROR } from '../../../Redux/Action/ActionTypes';
import { decryptData } from '../../../../utils/util';
import Header from "../../../components/Header/Header";

const ChangePassword = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const encryptEmail = localStorage.getItem('key1');
    let email = "";
    if (encryptEmail) {
        email = decryptData(encryptEmail);
    }

    const [click, setClick] = useState(false);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState({
        email: email,
        password: '',
        cpassword: ''
    });

    const { error, success } = useSelector((state) => state.userStore);

    const validate = () => {
        if (data.password === "" || data.cpassword === "") {
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
            dispatch(changePassword(data));
        }
    };

    useEffect(() => {
        if (success) {
            dispatch({ type: CLEAR_ERROR });
            localStorage.removeItem('key1');
            localStorage.removeItem('key2');
            history.push('/');
            setData({ email: '', password: '', cpassword: '' });
            message.success("Password Change");
        }
    }, [success])


    return (
        <div>
            <Header headerPages={["dashboard", 'appoinment']} />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoFocus
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                error={click && data?.password === ""}
                helperText={click && data?.password === "" ? 'Please Enter Password' : ""}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="cpassword"
                label="Confrim Password"
                name="cpassword"
                type="password"
                value={data.cpassword}
                onChange={(e) => setData({ ...data, cpassword: e.target.value })}
                error={click && data?.cpassword === ""}
                helperText={click && data?.cpassword === "" ? 'Please Enter Confrim Password' : ""}
            />
            <span className='error'>
                {error || msg}
            </span>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Change Password
            </Button>
            <Grid container>
                <Grid item>
                    <NavLink to="/" variant="body2">
                        {"Already have an account? Sign in"}
                    </NavLink>
                </Grid>
            </Grid>
        </Box>
        </div>
    )
}

export default ChangePassword;