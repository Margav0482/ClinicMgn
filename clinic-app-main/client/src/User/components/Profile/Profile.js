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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { getUserDetails, updateDetails } from '../../Redux/Action/userAction';
import { CLEAR_ERROR } from '../../Redux/Action/ActionTypes';
import Header from "../Header/Header";

const Profile = () => {

    const dispatch = useDispatch();

    const { error, userData, success } = useSelector((state) => state.userStore);

    const [click, setClick] = useState(false);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState({
        name: userData?.name,
        age: userData?.age,
        weight: userData?.weight,
        phone: userData?.phone,
        gender: userData?.gender
    });

    const validate = () => {
        const reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
        if (data.name === "" || data.age === "" || data.gender === "") {
            setClick(true);
            return false;
        } else {
            if (data?.phone !== "" && data?.phone !== null && data?.phone !== undefined) {
                if (!reg.test(data.phone)) {
                    setMsg("Please Enter Valid Phone");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            dispatch(updateDetails(data));
        }
    };

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch])

    useEffect(() => {
        if (success) {
            message.success("Update Profile");
            dispatch({ type: CLEAR_ERROR });
            setMsg("");
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
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoFocus
                                type="text"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                error={click && data?.name === ""}
                                helperText={click && data?.name === "" ? 'Please Enter Name' : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="age"
                                label="Age"
                                name="age"
                                type="number"
                                value={data.age}
                                onChange={(e) => setData({ ...data, age: e.target.value })}
                                error={click && data?.age === ""}
                                helperText={click && data?.age === "" ? 'Please Enter Age' : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="weight"
                                label="Weight"
                                name="weight"
                                type="number"
                                value={data.weight}
                                onChange={(e) => setData({ ...data, weight: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                autoFocus
                                type="number"
                                value={data.phone}
                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                                error={click && data?.phone === ""}
                                helperText={click && data?.phone === "" ? 'Please Enter PhoneNumber' : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel>Gender :</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={data.gender}
                                onChange={(e) => setData({ ...data, gender: e.target.value })}
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
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
                        Update
                    </Button>
                </Box>
            </Box>
        </Container>
        </div>
    )
}

export default Profile;