require('dotenv').config();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

// ForgotPassword

function generateOTP() {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const sendOTPMail = (email) => {
  const rendomNumber = generateOTP();
  var mailOptions = {
    from: 'kevinlathidadiya.dcs22n@vnsgu.ac.in',
    to: email,
    subject: 'Sending Email using Node.js',
    text: rendomNumber
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('rendomNumber: ' + rendomNumber);
    }
  });
    return rendomNumber;
}

module.exports = sendOTPMail;