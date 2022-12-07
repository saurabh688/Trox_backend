const validateResendOTPDetails = (userId, emailId) => {
    if (!userId || !emailId) return {
        success: false,
        message: 'UserId or emailId missing, please provide all the details!'
    };

    return {
        success: true,
        message: 'All details provided!'
    };
};

module.exports = validateResendOTPDetails;