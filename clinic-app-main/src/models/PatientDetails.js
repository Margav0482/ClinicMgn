require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const patientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        phone: {
            type: Number
        },
        email: {
            type: String
        },
        gender: {
            type: String
        },
        weight: {
            type: Number
        },
        address: {
            type: String
        },
        date: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        OTP: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

patientSchema.pre('save', async function (next) {
    const data = this;

    if (data.isModified('password')) {
        if (data.password !== "") {
            data.password = await bcrypt.hash(data.password, 8);
        }
    }
    next();
})

patientSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN_KEY);
    return token;
}

const PatientDetails = mongoose.model("PatientDetails", patientSchema);

module.exports = PatientDetails;