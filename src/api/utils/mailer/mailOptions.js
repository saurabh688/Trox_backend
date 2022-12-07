const { AUTH_EMAIL, VERIFICATION_SUBJECT } = require('../../../config/constants/Constants');

const mailOptions = (EMAIL_ID, OTP) => {
    return {
        from: AUTH_EMAIL,
        to: EMAIL_ID,
        subject: VERIFICATION_SUBJECT,
        html: `<p>Enter <b>${OTP}</b> in the app to verify your email address and complete the sign up process</p>
        <p>This code <b>expires in 10 minutes</b>.</p>`,
    };
}

// console.log('Date:', new Date(), 'Mailer options:', mailOptions('ns49108n@pace.edu', '1000'));

module.exports = mailOptions;