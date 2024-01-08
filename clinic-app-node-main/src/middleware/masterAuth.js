require('dotenv').config();
const jwt = require('jsonwebtoken');

// Check User Authentication

const masterAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = await jwt.verify(token, process.env.TOKEN_KEY);
        const user = decode.validToken;
        const varify_value = process.env.MASTER_TOKEN_VALUE;
        if (user !== varify_value) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: 'please authenticate' });
    }

}

module.exports = masterAuth;