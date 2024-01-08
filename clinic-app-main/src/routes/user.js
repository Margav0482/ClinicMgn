const express = require('express');
const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
const router = express.Router();
const PatientDetails = require('../models/PatientDetails');
const PatientHelth = require('../models/PatientHelth');
const auth = require('../middleware/auth');
const sendOTPMail = require('../utils/sendOTPMail');

// patient signin
router.post('/user/signup', async (req, res) => {
    const body = req.body;
    try {
        await PatientDetails.find({ email: body.email }).then(async (data) => {
            if (data.length !== 0) {
                return res.status(400).send({ message: "email address already exists" });
            }
            const newPatient = new PatientDetails(body)
            const token = await newPatient.generateAuthToken();
            await newPatient.save()
                .then((resData) => { return res.status(200).send({ token, resData }) })
                .catch((error) => { return res.status(400).send({ message: error.message }) })
        }).catch((error) => {
            res.status(400).send({ message: error.message });
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})


// patient signin

router.post('/user/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await PatientDetails.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "Email Not Register, Please SignUp" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Password Does Not Match" });
        }
        const token = await user.generateAuthToken();
        return res.status(200).send({ token, user });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

// Check For Auth Data

router.get('/user/auth', auth, (req, res) => {
    const userdata = req.user;
    res.send(userdata);
});

// ForgotPassword

// sendotp
router.post('/user/forgotpassword/checkmail', async (req, res) => {
    const email = req.body.email;
    try {
        if (email === "") {
            return res.status(404).send({ message: "Please Enter Email" });
        }
        await PatientDetails.find({ email: email }).then(async (data) => {
            if (data.length > 0) {
                const sendOptMail = data[0].email;
                const otp = sendOTPMail(sendOptMail);
                if (otp) {
                    await PatientDetails.findOneAndUpdate({ email: email }, { OTP: otp }, { new: true })
                        .then((data) => {
                            res.status(200).send(data);
                        })
                        .catch((error) => {
                            res.status(400).send({ message: error.message });
                        })
                }
            } else {
                return res.status(404).send({ message: "Email Not found" });
            }
        }).catch((error) => {
            res.status(400).send({ message: error.message });
        })

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

// verify otp

router.post('/user/verityOtp', async (req, res) => {
    email = req.body.email;
    otp = req.body.otp;
    try {
        if (email === "" || otp === "") {
            return res.status(404).send({ message: "Please Enter Value" });
        }
        await PatientDetails.find({ email: email, OTP: otp })
            .then(async (data) => {
                if (data.length === 0) {
                    return res.status(404).send({ message: "Please Enter Correct OTP" });
                }
                await PatientDetails.findOneAndUpdate({ email: email }, { OTP: "" }, { new: true })
                    .then((data) => {
                        res.status(200).send(data);
                    })
                    .catch((error) => {
                        res.status(400).send({ message: error.message });
                    })
            })
            .catch((error) => {
                res.status(400).send({ message: error.message });
            })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.patch('/user/changepassword', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (password === "" || email === "") {
            return res.status(404).send({ message: "Please Enter Password" });
        }
        await PatientDetails.findOne({ email: email })
            .then(async (data) => {
                if (!data) {
                    return res.status(404).send({ message: "User Does Not Match" });
                }
                data.password = password;
                data.save().then((data) => {
                    res.status(200).send(data);
                }).catch((error) => {
                    res.status(400).send({ message: error.message });
                })
            })
            .catch((error) => {
                res.status(400).send({ message: error.message });
            })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// End ForgotPassword

// Get Auth Details

router.get('/user/detail', auth, async (req, res) => {
    try {
        await PatientDetails.findOne({ _id: req.user._id }).then((user) => {
            res.status(200).send(user);
        }
        ).catch(() => res.status(400).send({ message: "Somthing want to wrong" }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/user/alldetails', auth, async (req, res) => {
    try {
        await PatientHelth.find({ patientId: req.user._id }).populate("patientId").exec().then((user) =>
            res.status(200).send(user)
        ).catch(() => res.status(400).send({ message: "Somthing want to wrong" }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.patch('/user/updateProfile', auth, async (req, res) => {
    try {
        await PatientDetails.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true }).then((data) => {
            res.status(200).send(data)
        }).catch((error) => res.status(400).send({ message: error.message }))
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

// update password
router.patch('/user/updatePassword', auth, async (req, res) => {
    try {
        const isMatch = await bcrypt.compare(req.body.oldpassword, req.user.password);
        if (!isMatch) {
            return res.status(404).send({ message: "OldPassword does not match" });
        }
        await PatientDetails.findOne({ _id: req.user._id }).then(async (user) => {
            user.password = req.body.password;
            await user.save();
            res.status(200).send(user);
        })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

module.exports = router;