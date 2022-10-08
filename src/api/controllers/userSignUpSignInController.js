const { userSignInService } = require('../services/userSigninService');
const ErrorMessage = require('../../config/constants/ErrorMessage');

const userSignIn = async (req, res) => {
    console.log("Date:", new Date(), 'Request body:', req.body);

    const user = await userSignInService(req.body);
    console.log("Date:", new Date(), 'Data return from user sign in service:', user);

    if (user.success){
        res
        .status(200)
        .json(user);
    }
    else if (!user.success && user.message == ErrorMessage.User_Error.Error_1 || user.message == ErrorMessage.User_Error.Error_2 || user.message == ErrorMessage.User_Error.Error_4 || user.message == ErrorMessage.User_Error.Error_5) {
        res
        .status(404)
        .json(user);
    }
    else if (!user.success && ErrorMessage.User_Error.Error_3) {
        res
        .status(403)
        .json(user);
    }
    else if (!user.success) {
        res
        .status(400)
        .json(user);
    }
};

module.exports = {
    userSignIn
};