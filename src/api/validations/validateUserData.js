const { VERIFY_EMAIL, VERIFY_PHONE } = require('../validations/validateEmailOrPhone');

const validateUserData = (userData) => {
    const { fullName, emailID_or_phone, password } = userData;

    if (!fullName || !emailID_or_phone || !password) return {
        success: false,
        message: "Please enter required fields for user sign-up, 'fullName', 'lastName', 'phoneNumber' or 'emailID', and 'password'!"
    };

    if (password.length < 8) {
        return {
            success: false,
            message: 'Password length must be at least 8 characters!'
        }
    }

    let verifyEmail = VERIFY_EMAIL(emailID_or_phone);
    let verifyPhone = VERIFY_PHONE(emailID_or_phone);

    if (!verifyEmail && !verifyPhone) return {
        success: false,
        message: 'Enter a valid Email Id or Phone Number'
    }

    if (!verifyEmail && verifyPhone) return {
        success: true,
        message: 'Required fields are provided!',
        data: {
            ...userData,
            phoneNumber: emailID_or_phone
        },
        uniqueIdentifier: 'PHONE'
    };

    if (!verifyPhone && verifyEmail) return {
        success: true,
        message: 'Required fields are provided!',
        data: {
            ...userData,
            emailID: emailID_or_phone
        },
        uniqueIdentifier: 'EMAIL'
    };
}

module.exports = validateUserData;