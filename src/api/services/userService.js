const {Op} = require('sequelize');

const User = require('../models/t_user.model');
const { decodeJWT } = require('../utils/decodeJWT');

const validateLoggedInUser = async (authorizationToken) => {
    try {
        let loggedInUserId = decodeJWT(authorizationToken);
        console.log('Date:', new Date(), 'Logged-in user ID:', loggedInUserId);

        if (!loggedInUserId) return {
            success: false,
            message: 'Invalid authorization token!'
        };

        let userDetails = await User.findByPk(loggedInUserId);

        if (!userDetails) return {
            success: false,
            message: 'User not found!'
        };

        return {
            success: true,
            message: 'User has been authenticated!',
            data: loggedInUserId
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
};

module.exports = {
    validateLoggedInUser
};