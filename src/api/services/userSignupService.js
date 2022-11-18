const randomToken = require('rand-token');
const { Op } = require('sequelize')

const UserAuth = require('../models/t_users_auth.model');
const User = require('../models/t_user.model');
const validateUserData = require('../validations/validateUserData');
const generateHash = require('../utils/generateHash');
const { issueJWT, issueRefreshToken } = require('../utils/issueJWT');

const validateUserExist = async (phoneNumber, emailID) => {
    try {
        let phoneOrEmailOfUserExist = await User.findAll({
            where: {
                [Op.or]: [{
                    phoneNumber: phoneNumber
                }, {
                    emailID: emailID
                }]
            }
        });

        console.log("User Exist:", phoneOrEmailOfUserExist);

        let phoneAndEmailOfUserExist = await User.findOne({
            where: {
                [Op.and]: [{
                    phoneNumber: phoneNumber
                }, {
                    emailID: emailID
                }]
            }
        });

        console.log("User Exist:", phoneAndEmailOfUserExist);

        if (phoneAndEmailOfUserExist != null) return {
            success: false,
            message: "You are already registered with us. Please login to enter Trox!"
        }

        else if (phoneOrEmailOfUserExist.length > 0) {
            let phoneAlreadyExist = phoneOrEmailOfUserExist
                .filter(user => user.dataValues.phoneNumber == phoneNumber)
                .map(user => user);

            if (phoneAlreadyExist.length > 0) return {
                success: false,
                message: "Phone number is already registered!"
            }
            else return {
                success: false,
                message: "Email Address is already registered!"
            }
        }

        else {
            return {
                success: true,
                message: "User does not exist!"
            }
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const createNewUser = async (newUserData) => {
    try {
        let newUser = await User.create(newUserData);
        console.log("Date:", new Date(), "New user created:", newUser.dataValues);

        if (!newUser) return {
            success: false,
            message: 'Not Registered!'
        }

        return {
            success: true,
            message: 'New User in t_user created!',
            data: newUser.dataValues
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    }
};

const createNewUserAuth = async (newUserAuthData) => {
    try {
        let newUserAuth = await UserAuth.create(newUserAuthData);
        console.log("Date:", new Date(), "New User Auth created:", newUserAuth.dataValues);

        if (!newUserAuth) {
            let deleteNewUser = await User.destroy({
                where: {
                    id: newUserAuthData.userId
                }
            });

            console.log('Date:', new Date(), "Delete new user:", deleteNewUser);

            return {
                success: false,
                message: 'Not Registered!'
            };
        }

        return {
            success: true,
            message: 'User Auth created!',
            data: newUserAuth.dataValues
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const addUserService = async (userData) => {
    try {

        let { firstName, lastName, phoneNumber, emailID, password, userType } = userData;

        let checkUserData = validateUserData(userData);
        console.log("Date:", new Date(), "validate if user data are provided:", checkUserData);

        if (!checkUserData.success) return checkUserData;

        let checkUserExist = await validateUserExist(phoneNumber, emailID);
        console.log("Date:", new Date(), "validate if user exist:", checkUserExist);

        if (!checkUserExist.success) return checkUserExist;

        let newUserData = { firstName, lastName, phoneNumber, emailID, userType };
        console.log("Date:", new Date(), "Data for t_user table:", newUserData);

        let newUser = await createNewUser(newUserData);
        console.log("Date:", new Date(), "New user created:", newUser);

        if (!newUser.success) return newUser;

        let hashing = await generateHash(password);
        let { HASH, SALT } = hashing;

        console.log("Date:", new Date(), "SALT for hashing:", SALT);
        console.log("Date:", new Date(), "Hashed password:", HASH);

        const uniqueToken = randomToken.uid(255);
        console.log("Date:", new Date(), "Unique Token:", uniqueToken);

        let newUserAuthData = { userId: newUser.data.id, phoneNumber, emailID, userType, salt: SALT, password: HASH, uniqueToken };
        console.log("Date:", new Date(), "Data for t_user_auth table:", newUserAuthData);

        let newUserAuth = await createNewUserAuth(newUserAuthData);
        console.log("Date:", new Date(), "New User auth created:", newUserAuth);

        if (!newUserAuth.success) return newUserAuth;

        const user = newUser.data;
        const userAuth = newUserAuth.data;

        const tokenObject = issueJWT(user.id);
        const refreshTokenObject = issueRefreshToken(user.id, userAuth.uniqueToken);

        const returnPayload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            emailId: user.emailID,
            userType: userAuth.userType,
            status: userAuth.status,
            accessToken: tokenObject.token,
            refreshTokenObject: refreshTokenObject.token
        }

        return {
            success: true,
            message: 'User registered!',
            data: returnPayload
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

module.exports = {
    addUserService
}