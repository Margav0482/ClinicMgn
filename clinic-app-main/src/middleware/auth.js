require('dotenv').config();
const jwt = require('jsonwebtoken');
const PatientDetails = require('../models/PatientDetails');

// Check User Authentication

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = await jwt.verify(token, process.env.TOKEN_KEY);
        const user = await PatientDetails.findOne({ _id: decode._id });
        if (!user) {
            throw new Error();
        }
        req.token = token
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: 'please authenticate' });
    }

}

module.exports = auth;