const {Op} = require('sequelize');

const User = require('../models/t_user.model');
const { decodeJWT } = require('../utils/decodeJWT');

const functionToGetUserData = async (userId) => {
    try {
        const userData = await User.findByPk(userId);

        if (!userData) return {
            success: false,
            message: 'User not found!'
        };

        if (userData.dataValues.isDeleted == true) return {
            success: false,
            message: 'User has been deleted!'
        } 

        return {
            success: true,
            message: 'User data found!',
            data: userData.dataValues
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}


const validateLoggedInUser = async (authorizationToken) => {
    try {
        let loggedInUserId = decodeJWT(authorizationToken);
        console.log('Date:', new Date(), 'Logged-in user ID:', loggedInUserId);

        if (!loggedInUserId) return {
            success: false,
            message: 'Invalid authorization token!'
        };

        console.log('Date:', new Date(), 'Id:', loggedInUserId);

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

const getUserService = async (authorizationToken) => {
    try {
        const loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        const userId = loggedInUser.data;

        const userDetails = await functionToGetUserData(userId);

        return userDetails;
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

module.exports = {
    validateLoggedInUser,
    getUserService
};