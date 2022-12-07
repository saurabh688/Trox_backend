const nodemailer = require('nodemailer');
const { AUTH_EMAIL, AUTH_PASS } = require('../../../config/constants/Constants');

console.log('User:', AUTH_EMAIL);
console.log('Pass:', AUTH_PASS);


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS
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