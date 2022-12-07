const { PHONE_REGEX, EMAIL_REGEX } = require('../../config/constants/Constants');

const validateEmail = (emailId) => {
    return EMAIL_REGEX.test(emailId);
};


const validatePhone = (phone) => {
    return PHONE_REGEX.test(phone);
}


// console.log('Date:', new Date(), 'Validate email id:', validateEmail('Abc.example.com'));
// console.log('Date:', new Date(), 'Validate phone no:', validatePhone('+1/234/567/8901'));


// console.log('Date:', new Date(), 'Validate email id:', validateEmail('sahunihar0602@gmail.com'));
// console.log('Date:', new Date(), 'Validate phone no:', validatePhone('+1 201 253-8925'));


module.exports = {
    VERIFY_EMAIL: validateEmail,
    VERIFY_PHONE: validatePhone
}