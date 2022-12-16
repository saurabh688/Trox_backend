const { Op } = require('sequelize');

const Address = require('../models/t_address.model');

const { validateLoggedInUser } = require('../services/userService');
const validateAddressDetails = require('../validations/validateAddressDetails');


const functionToAddInTable = async (addressData) => {
    try {
        const addToTable = await Address.create(addressData);

        if (!addToTable) return {
            success: false,
            message: 'Could not add to table!'
        };

        return {
            success: true,
            message: 'Added to the table!',
            data: addToTable.dataValues
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const functionGetUserAddress = async (userId) => {
    try {
        const searchAddresses = await Address.findAll({
            where: {
                [Op.and]: [
                    { userId },
                    { isDeleted: false }
                ]
            }
        });

        if (searchAddresses.length < 1) return {
            success: false,
            message: 'User has not added address!'
        };

        let addressArr = searchAddresses.map(address => address.dataValues);

        return {
            success: true,
            message: 'User address found!',
            data: addressArr
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const functionToAddressById = async (addressId) => {
    try {
        const address = await Address.findByPk(addressId);

        if (!address) return {
            success: false,
            message: 'Address does not exist!'
        };

        if (!address.dataValues.isDeleted) return {
            success: false,
            message: 'Address has been deleted!'
        };

        return {
            success: true,
            message: 'Address found!',
            data: address.dataValues
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const functionToUpdateAddress = async (addressId, addressData) => {
    try {
        const updateAddress = await Address.update(addressData, {
            returning: true,
            where: {
                [Op.and]: [
                    { id: addressId },
                    { isDeleted: false }
                ]
            }
        });

        if (updateAddress[1] < 1) return {
            success: false,
            message: 'Address could not be updated!'
        }

        let getUpdatedAddress = await functionToAddressById(addressId);

        return getUpdatedAddress;
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const functionToDeleteAddress = async (addressId, userId) => {
    try {
        let updateData = {
            isDeleted: true
        };

        const deleteAddress = await Address.update(updateData, {
            returning: true,
            where: {
                [Op.and]: [
                    { id: addressId },
                    { userId: userId },
                    { isDeleted: false }
                ]
            }
        });

        if (deleteAddress[1] < 1) return {
            success: false,
            message: 'Address could not be deleted!'
        };

        return {
            success: true,
            message: 'Address has been deleted!'
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const createAddressService = async (authorizationToken, addressData) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let loggedInUserId = loggedInUser.data;

        addressData.userId = loggedInUserId;
        addressData.createdBy = loggedInUserId;
        addressData.modifiedBy = loggedInUserId;

        const verifyAddressDetails = validateAddressDetails(addressData);

        if (!verifyAddressDetails.success) return verifyAddressDetails;

        const createAddress = await functionToAddInTable(verifyAddressDetails.data);

        return createAddress;
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const viewAddressService = async (authorizationToken) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let userId = loggedInUser.data;

        let getAddress = await functionGetUserAddress(userId);

        return getAddress;
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const updateAddressService = async (authorizationToken, addressId, addressData) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let updateAddress = await functionToUpdateAddress(addressId, addressData);

        if (!updateAddress.success) return updateAddress;

        return {
            success: true,
            message: 'Address has been updated!',
            data: updateAddress.data
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const deleteAddressService = async (authorizationToken, addressId) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let userId = loggedInUser.data;

        let deleteAddress = await functionToDeleteAddress(addressId, userId);

        return deleteAddress;
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

module.exports = {
    createAddressService,
    viewAddressService,
    updateAddressService,
    deleteAddressService
}

