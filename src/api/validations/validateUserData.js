const validateUserData = (userData) => {
    const { firstName, lastName, phoneNumber, emailID, password, userType } = userData;

    if (!firstName || !lastName || !phoneNumber || !emailID || !password || !userType) return {
        success: false,
        message: "Please enter required fields for user sign-up, 'firstName', 'lastName', 'phoneNumber', 'emailID', 'password', 'userType'!"
    };

    if (password.length < 8) {
        return {
            success: false,
            message: 'Password length must be at least 8 characters!'
        }
    }

    return {
        success: true,
        message: 'Required fields are provided!',
        data: userData
    };
}

module.exports = validateUserData;