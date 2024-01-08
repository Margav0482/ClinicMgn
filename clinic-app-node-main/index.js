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

const port = process.env.POST || 4000;

app.use(patientdetails);
app.use(helthdetails);
app.use(user);
app.use(medicinedetails);
app.use(appoinment);
app.use(userBookAppoinment);

app.listen(port, () => console.log(`App Runing on post : ${port}`))