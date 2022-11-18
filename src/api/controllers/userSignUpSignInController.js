const { addUserService } = require('../services/userSignupService');
const { userSignInService } = require('../services/userSigninService');
const ErrorMessage = require('../../config/constants/ErrorMessage');

const userSignUp = async (req, res) => {
    console.log("Date:", new Date(), 'Request body:', req.body);

    const user = await addUserService(req.body);
    console.log("Date:", new Date(), 'Data returned from user sign up in service:', req.body);

    if (user.success) {
        res
        .status(201)
        .json(user);
    }
    else if (!user.success && user.message == ErrorMessage.User_Error.Error_6 || user.message == ErrorMessage.User_Error.Error_11) {
        res
        .status(404)
        .json(user);
    }
    else if (!user.success && user.message == ErrorMessage.User_Error.Error_7 || user.message == ErrorMessage.User_Error.Error_8 || user.message == ErrorMessage.User_Error.Error_9 || user.message == ErrorMessage.User_Error.Error_10) {
        res
        .status(401)
        .json(user);
    }
    else if (!user.success) {
        res
        .status(400)
        .json(user);
    }
};

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
    userSignUp,
    userSignIn
};