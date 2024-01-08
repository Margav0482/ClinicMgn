require('dotenv').config();
require('./src/db/');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const patientdetails = require('./src/routes/patientdetails');
const helthdetails = require('./src/routes/helthdetails');
const user = require('./src/routes/user');
const medicinedetails = require('./src/routes/medicinedetails');
const appoinment = require('./src/routes/appoinment');
const userBookAppoinment = require('./src/routes/userBookAppoinment');

const port = process.env.PORT || 4000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
}

app.use(patientdetails);
app.use(helthdetails);
app.use(user);
app.use(medicinedetails);
app.use(appoinment);
app.use(userBookAppoinment);

app.listen(port, () => console.log(`App Runing on port : ${port}`))