const randomToken = require('rand-token');
const { Op } = require('sequelize')

const UserAuth = require('../models/t_users_auth.model');
const User = require('../models/t_user.model');
const validateUserData = require('../validations/validateUserData');
const generateHash = require('../utils/generateHash');
const { issueJWT, issueRefreshToken } = require('../utils/issueJWT');
const transporter = require('../utils/mailer/transporter');
const mailOptions = require('../utils/mailer/mailOptions');
const verifyOtpDetails = require('../validations/verifyOtpDetails');
const comparePassword = require('../utils/comparePassword');
const validateResendOTPDetails = require('../validations/validateResendOTPDetails');

// Todo: remove userType
// Todo: login through phone or emailId

const validateUserExist = async (emailID_or_phone) => {
    try {
        let phoneOrEmailOfUserExist = await User.findAll({
            where: {
                [Op.or]: [{
                    phoneNumber: emailID_or_phone
                }, {
                    emailID: emailID_or_phone
                }]
            }
        });

        console.log('Date:', new Date(), "User Exist with phone or email:", phoneOrEmailOfUserExist);

        let phoneAndEmailOfUserExist = await User.findOne({
            where: {
                [Op.and]: [{
                    phoneNumber: emailID_or_phone
                }, {
                    emailID: emailID_or_phone
                }]
            }
        });

        console.log('Date:', new Date(), "User Exist with phone and email:", phoneAndEmailOfUserExist);

        if (phoneAndEmailOfUserExist != null) return {
            success: false,
            message: "You are already registered with us. Please login to enter Trox!"
        }

        else if (phoneOrEmailOfUserExist.length > 0) {
            let phoneAlreadyExist = phoneOrEmailOfUserExist
                .filter(user => user.dataValues.phoneNumber == emailID_or_phone)
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

const createNewUserAuth = async (newUserAuthData, uniqueIdentifier, userStatus) => {
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

        if (uniqueIdentifier == 'EMAIL' && userStatus == 'inactive') {
            let sendOTP = await sendOTPVerificationEmail(newUserAuthData.userId, newUserAuthData.emailID);
            console.log('Date:', new Date(), 'Send otp response:', sendOTP);
            if (!sendOTP.success) return sendOTP;
        }

        return {
            success: true,
            message: 'User Auth created and OTP sent!',
            data: newUserAuth.dataValues
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const sendOTPVerificationEmail = async (userId, emailID) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        let mailOp = mailOptions(emailID, otp);

        const hashedOTP = await generateHash(otp);

        let updateValue = {
            verificationToken: hashedOTP.HASH,
            expiresAt: Date.now() + 600000
        };

        const updateUserAuth = await UserAuth.update(updateValue, {
            returning: true,
            where: { userId: userId }
        });

        if (updateUserAuth[1] == 0) {
            let deleteNewUser = await User.destroy({
                where: {
                    id: newUserAuthData.userId
                }
            });

            let deleteNewUserAuth = await UserAuth.destroy({
                where: {
                    emailID: emailID
                }
            });

            console.log('Date:', new Date(), "Delete new user:", deleteNewUser);
            console.log('Date:', new Date(), "Delete new user auth:", deleteNewUserAuth);

            return {
                success: false,
                message: 'Could not update otp and expiresAt'
            };
        }

        const sendOtpMail = await transporter.sendMail(mailOp);
        console.log('Date:', new Date(), 'Send otp mail response:', sendOtpMail);

        if (sendOtpMail.accepted.length == 0) return {
            success: false,
            message: 'Could not send OTP!'
        }

        return {
            success: true,
            message: 'OTP sent'
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const verifyAuthDetails = async (userId) => {
    try {
        let searchUser = await UserAuth.findOne({
            where: { userId }
        });

        if (!searchUser) return {
            success: false,
            message: 'User does not exist!'
        }

        let expireDate = searchUser.dataValues.expiresAt;
        let hashedOTP = searchUser.dataValues.verificationToken;
        let uniqueToken = searchUser.dataValues.uniqueToken;

        return {
            success: true,
            message: 'Auth details verified!',
            data: {
                expiresAt: expireDate,
                storedOTP: hashedOTP,
                uniqueToken: uniqueToken
            }
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const validateOTPExpired = async (userId, expireDate) => {
    try {
        // otp expired
        if (expireDate < Date.now()) {
            let updateAuth = await updateUserAuthTable(userId);

            return updateAuth;
        }

        return {
            success: true,
            message: 'OTP has not expired!'
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const verifyOTP = async (OTP, hashedOTP) => {
    try {
        let compareOTP = await comparePassword(OTP, hashedOTP);

        if (!compareOTP.success) return {
            success: false,
            message: 'Invalid code passed. Check your inbox!'
        }

        return {
            success: true,
            message: 'OTP verified!'
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const updateUserTable = async (userId) => {
    try {
        let updateUserTable = await User.update({ status: 'active' }, {
            returning: true,
            where: { id: userId }
        });

        if (updateUserTable[1] == 0) return {
            success: false,
            message: 'Could not update user status!'
        }

        return {
            success: true,
            message: 'OTP verified!'
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
};

const updateUserAuthTable = async (userId) => {
    try {
        let updateUserAuth = await UserAuth.update({ expiresAt: null, verificationToken: null }, {
            returning: true,
            where: { userId }
        });

        if (updateUserAuth[1] == 0) return {
            success: false,
            message: 'Expires At and verificationToken could not be updated!'
        };

        return {
            success: true,
            message: 'Expires At and verificationToken deleted!'
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

        let { emailID_or_phone, password } = userData;

        let checkUserData = validateUserData(userData);
        console.log("Date:", new Date(), "validate if user data are provided:", checkUserData);

        if (!checkUserData.success) return checkUserData;

        let checkUserExist = await validateUserExist(emailID_or_phone);
        console.log("Date:", new Date(), "validate if user exist:", checkUserExist);

        if (!checkUserExist.success) return checkUserExist;

        let newUserData = checkUserData.data;
        console.log("Date:", new Date(), "Data for t_user table:", newUserData);

        let uniqueIdentifier = checkUserData.uniqueIdentifier;
        console.log("Date:", new Date(), "Unique identifier for registration:", uniqueIdentifier);

        let newUser = await createNewUser(newUserData);
        console.log("Date:", new Date(), "New user created:", newUser);

        if (!newUser.success) return newUser;

        let hashing = await generateHash(password);
        let { HASH, SALT } = hashing;

        console.log("Date:", new Date(), "SALT for hashing:", SALT);
        console.log("Date:", new Date(), "Hashed password:", HASH);

        const uniqueToken = randomToken.uid(255);
        console.log("Date:", new Date(), "Unique Token:", uniqueToken);

        let userTableStatus = newUser.data.status

        let newUserAuthData = uniqueIdentifier == 'PHONE' ? 
        { userId: newUser.data.id, phoneNumber: emailID_or_phone, salt: SALT, password: HASH, uniqueToken} : 
        { userId: newUser.data.id, emailID: emailID_or_phone, salt: SALT, password: HASH, uniqueToken};
        console.log("Date:", new Date(), "Data for t_user_auth table:", newUserAuthData);

        let newUserAuth = await createNewUserAuth(newUserAuthData, uniqueIdentifier, userTableStatus);
        console.log("Date:", new Date(), "New User auth created:", newUserAuth);

        if (!newUserAuth.success) return newUserAuth;

        const user = newUser.data;

        const returnPayload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            emailId: user.emailID,
        }

        return {
            success: true,
            message: 'Verify using otp sent in email!',
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

const verifyOTPService = async (userData) => {
    try {
        let { userId, otp } = userData;

        let verifyDetails = verifyOtpDetails(userId, otp);

        if (!verifyDetails.success) return verifyDetails;

        let getAuthDetails = await verifyAuthDetails(userId);

        if (!getAuthDetails.success) return getAuthDetails;

        let expiresAt = getAuthDetails.data.expiresAt;
        let storedOTP = getAuthDetails.data.storedOTP;
        let uniqueToken = getAuthDetails.data.uniqueToken;

        const verifyOTPExpiry = await validateOTPExpired(userId, expiresAt);

        if (!(verifyOTPExpiry.success && verifyOTPExpiry.message == 'OTP has not expired!')) return verifyOTPExpiry;

        let validateOTP = await verifyOTP(otp, storedOTP);

        if (!validateOTP.success) return validateOTP;

        let updateUser = await updateUserTable(userId);

        if (!updateUser.success) return updateUser;

        const tokenObject = issueJWT(userId);
        const refreshTokenObject = issueRefreshToken(userId, uniqueToken);

        return {
            success: true,
            message: 'User email has been verified!',
            data: {
                id: userId,
                accessToken: tokenObject.token,
                refreshTokenObject: refreshTokenObject.token,
                status: 'active'
            }
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const resendOTPService = async (userData) => {
    try {
        let { userId, emailId } = userData;

        const validateResendDetails = validateResendOTPDetails(userId, emailId);

        if (!validateResendDetails.success) return validateResendDetails;

        let updateAuth = await updateUserAuthTable(userId);

        if (!updateAuth.success) return updateAuth;

        let sendOTP = await sendOTPVerificationEmail(userId, emailId);
        console.log('Date:', new Date(), 'Send otp response:', sendOTP);
        if (!sendOTP.success) return sendOTP;

        return {
            success: true,
            message: 'OTP has been resent!'
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

module.exports = {
    addUserService,
    verifyOTPService,
    resendOTPService
}