const nodemailer = require('nodemailer');
require('dotenv').config();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

transporter.verify((error, success) => {
    if (error) {
        throw error;
    }
    else {
        console.log('Date:', new Date(), 'Ready to send otp for verification:', success);
    }
});

module.exports = transporter;