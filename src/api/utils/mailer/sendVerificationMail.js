const { PORT, API_VERSION } = require('../../../config/constants/Constants');
const mailOptions = require('./mailOptions');


const sendVerificationMail = (id, emailID, hashedUniqueToken) => {
    const currentURL = `http://localhost:${PORT}${API_VERSION}/`;
    const mailConfig = mailOptions(emailID, currentURL, id, hashedUniqueToken);
    return mailConfig;
};

module.exports = sendVerificationMail;