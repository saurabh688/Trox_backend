const { Op } = require('sequelize');
const randomToken = require('rand-token');

const User = require('../models/t_user.model');
const UserAuth = require('../models/t_users_auth.model');
const comparePassword = require('../utils/comparePassword');

// Todo: issue JWT, refreshToken
const { issueJWT, issueRefreshToken } = require('../utils/issueJWT'); 

// Todo: decode JWT.
const { decodeRefreshToken } = require('../utils/decodeJWT');


const functionToVerifyRequiredDetails = (emailID, password) => {
    if (!emailID) {
        return {
            success: false,
            message: 'Please enter your email ID!'
        }
    }

    if (!password) {
        return {
            success: false,
            message: 'Please enter your password!'
        }
    }

    else {
        return {
            success: true,
            message: 'Required details provided!'
        }
    }
}

const validateRegisteredUser = async (emailID, password) => {
    try {
        let userAuthDetails = await UserAuth.findOne({
            where: {
                emailID: emailID
            }
        });

        console.log('Date:', new Date(), 'searched user auth details:', userAuthDetails);

        if (!userAuthDetails) return {
            success: false,
            message: 'You are not registered with us. Please sign up with Trox!'
        }

        const hashedPassword = userAuthDetails.dataValues.password;

        let validatePassword = await comparePassword(password, hashedPassword);
        console.log('Date:', new Date(), 'Validate password:', validatePassword);

        if (!validatePassword.success) return validatePassword;

        let userId = userAuthDetails.dataValues.userId;

        let userDetails = await User.findByPk(userId);

        console.log('Date:', new Date(), 'user details:', userDetails);

        if (!userDetails) {
            return {
                success: false,
                message: 'You are not registered with us. Please sign up with Trox!'
            }
        }
        return {
            success: true,
            message: 'User is registered!',
            data: userDetails.dataValues
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const functionToReturnUpdatedUser = async (userId) => {
    try {
        const returnUpdatedUser = await User.findOne({ where: { id: userId } });

        console.log('Date:', new Date(), 'Returned updated data:', returnUpdatedUser);

        if (!returnUpdatedUser)
            return {
                success: false,
                message: 'User not found!'
            }

        return {
            success: true,
            message: 'User with the provided unique token found!',
            data: returnUpdatedUser.dataValues
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    }
}

const functionToUpdateUser = async (updateData, userId) => {
    try {
        const updateUser = await User.update(updateData, {
            returning: true,
            where: {
                id: userId
            }
        });

        if (updateUser[1] > 0) {
            const verifyUpdatedUser = await functionToReturnUpdatedUser(userId);

            console.log('Date:', new Date(), 'Data return from function to return updated user:', verifyUpdatedUser);

            return {
                success: true,
                message: 'User table has been updated!',
                data: verifyUpdatedUser.data
            };
        }

        return {
            success: false,
            message: 'Could not update user!'
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
};

const userSignInService = async (userData) => {
    try {
        console.log('Date:', new Date(), 'Data received from controller:', userData);

        const { emailID, password } = userData;

        const verifyDetails = functionToVerifyRequiredDetails(emailID, password);

        console.log('Date:', new Date(), 'Verification of details provided:', verifyDetails);

        if (!verifyDetails.success) return verifyDetails;

        console.log('Date:', new Date(), '-------------> Next step <-------------');

        let verifyIfRegistered = await validateRegisteredUser(emailID, password);

        console.log('Date:', new Date(), 'Registered user details:', verifyIfRegistered);

        if (!verifyIfRegistered.success)
        return verifyIfRegistered;

        const searchedUser = verifyIfRegistered.data;

        return successfulLogin(searchedUser, 'VALIDATE');
    } 
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const successfulLogin = async (searchedUser, loginType) => {
    try {
        const uniqueToken = randomToken.uid(255);
        console.log("Date:", new Date(), 'Unique token generated for User Authentication:', uniqueToken);

        const updateData = {
            uniqueToken: uniqueToken,
            status: 'active',
            updatedBy: searchedUser.id
        };

        const verifyUserUpdate = await functionToUpdateUser(updateData, searchedUser.id);

        console.log('Date:', new Date(), 'data return from function to update user:', verifyUserUpdate);

        if (!verifyUserUpdate.success)
            return verifyUserUpdate;

        let updatedUserDetails = verifyUserUpdate.data;

        const tokenObject = issueJWT(searchedUser.id);
        const refreshTokenObject = issueRefreshToken(searchedUser.id, updatedUserDetails.uniqueToken);

        console.log("Date:", new Date(), "Original ID: ", searchedUser.id);
        console.log("Date:", new Date(), "Token Object: ", tokenObject);
        console.log("Date:", new Date(), "Refresh Token Object: ", refreshTokenObject);

        let returnData;

        if (loginType === 'VALIDATE') {
            // TODO: Send OTP to email/number => firebase

            returnData = {
                id: searchedUser.id,
                emailID: searchedUser.emailID,
                status: searchedUser.status,
                isDeleted: searchedUser.isDeleted,
                accessToken: tokenObject.token,
                refreshToken: refreshTokenObject.token
            }
        }
        else {
            if (searchedUser.status == 'inactive') {
                searchedUser.status = 'active';
                // TODO: generate email template to welcome new user.
                // TODO: send welcome email template.
            }

            const updateUser = await User.update(searchedUser, {
                returning: true,
                where: {
                    id: searchedUser.id
                }
            });

            console.log("Date:", new Date(), "Updated User", updateUser);
        
            returnData =  {
                id: searchedUser.id,
                emailID: searchedUser.emailID,
                status: searchedUser.status,
                isDeleted: searchedUser.isDeleted,
                accessToken: tokenObject.token,
                refreshToken: refreshTokenObject.token
            }
        }

        return {
            success: true,
            message: "You have successfully logged-in!",
            data: returnData
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

// TODO: complete issue new token service.
const issueNewTokensService = async (refreshToken) => {
    try {
        const userIdAndUniqueToken = decodeRefreshToken(refreshToken);
        const id = userIdAndUniqueToken.id;
        const uniqueToken = userIdAndUniqueToken.uniqueToken;
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

module.exports = {
    userSignInService
};