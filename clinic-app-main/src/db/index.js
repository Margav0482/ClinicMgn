const mongoose = require("mongoose");
require('dotenv').config();

const DB = process.env.MONGODB_URL;

mongoose.connect(DB)
    .then(()=> console.log('DB Connected'))
    .catch((error) => console.log(error.message));

    // , { useNewUrlParser: true, useUnifiedTopology: true }