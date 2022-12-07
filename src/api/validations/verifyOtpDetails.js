const verifyOtpDetails = (userId, otp) => {
    if (!userId || !otp) return {
        success: false,
        message: 'User Id or OTP missing!'
    };

    return {
        success: true,
        message: 'User data verified!'
    };
};

module.exports = verifyOtpDetails;