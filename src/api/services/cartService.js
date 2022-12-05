const { Op } = require('sequelize');

const Cart = require('../models/t_cart.model');

const { validateLoggedInUser } = require('../services/userService');
const validateCartDetails = require('../validations/validateCartDetails');

const functionToAddCartData = async (verifiedData) => {
    try {
        let addToCart = await Cart.create(verifiedData);
        console.log('Date:', new Date(), 'Add to cart response:', addToCart);

        if (!addToCart) return {
            success: false,
            message: 'Could not add to cart!'
        };

        return {
            success: true,
            message: 'Added data to cart table!',
            data: addToCart.dataValues
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const functionToGetCartDetailsOfUser = async (loggedInUserID) => {
    try {
        let cartList = await Cart.findAll({
            where: {
                [Op.and]: [
                    {
                        userId: loggedInUserID
                    },
                    {
                        isDeleted: false
                    }
                ]
            },
            order: [['createdAt', 'ASC']]
        });

        console.log('Date:', new Date(), 'cart list:', cartList);

        if (!cartList) return {
            success: false,
            message: 'Logged in user does not have cart!'
        };

        let cartListData = cartList.map(cart => cart.dataValues);

        return {
            success: true,
            message: 'Cart list found!',
            data: cartListData
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const functionToUpdateCartItem = async (loggedInUserId, cartId, updatedData) => {
    try {
        let updateCartData = await Cart.update(updatedData, {
            returning: true,
            where: { 
                [Op.and]: [
                    {
                        id: cartId
                    },
                    {
                        userId: loggedInUserId
                    },
                    {
                        isDeleted: false
                    }
                ]
            }
        });

        if (updateCartData[1] > 0) {
            let getCartDetails = await functionToGetCartDetailsOfUser(loggedInUserId);
            return getCartDetails;
        } 

        return {
            success: false,
            message: 'Sorry could not update cart!'
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
};

const functionToCalculateTotalPrice = (price, quantity) => {
    return quantity * price;
}

const functionToCreateUpdateData = (cartData) => {
    let { price, quantity, isDeleted } = cartData;

    if (!price || !quantity) {
        return {
            success: false,
            message: "Price and quantity cannot be zero should be a real number!"
        }
    }

    if (isDeleted) {
        return {
            success: true,
            message: 'Data to update created!',
            data: { isDeleted }
        }
    }

    if (!isDeleted && quantity == 0) {
        return {
            success: true,
            message: 'Data to update created!',
            data: {
                quantity,
                price,
                totalPrice: functionToCalculateTotalPrice(price, quantity),
                isDeleted: true
            }
        }
    }

    return {
        success: true,
        message: 'Data to update created!',
        data: {
            quantity,
            price,
            totalPrice: functionToCalculateTotalPrice(price, quantity)
        }
    };
};

const functionToDeleteCartItem = async (cartId) => {
    try {
        let deleteItem = await Cart.destroy({
            where: {
                id: cartId
            },
            returning: true
        });

        console.log('Date:', new Date(), 'Response of delete cart item:', deleteItem);

        if (!deleteItem) return {
            success: false,
            message: 'Sorry could not delete the item!'
        };

        return {
            success: true,
            message: 'Item Deleted!'
        }
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const addCartService = async (authorizationToken, cartData) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let loggedInUserId = loggedInUser.data;
        let newCartData = {
            ...cartData,
            userId: loggedInUserId
        }

        let verifyCartData = validateCartDetails(newCartData);
        console.log('Date:', new Date(), 'verified cart object:', verifyCartData);
        
        if (!verifyCartData.success) return verifyCartData;

        let verifiedData = {
            ...verifyCartData.data,
            totalPrice: functionToCalculateTotalPrice(verifyCartData.data.price, verifyCartData.data.quantity)
        };

        let addToCart = await functionToAddCartData(verifiedData);
        console.log('Date:', new Date(), 'add to cart response:', addToCart);

        return addToCart;
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};


const viewCartService = async (authorizationToken) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log('Date:', new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let loggedInUserId = loggedInUser.data;

        let cartList = await functionToGetCartDetailsOfUser(loggedInUserId);
        console.log('Date:', new Date(), 'cart list response:', cartList);
        
        return cartList;
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const updateCartService = async (authorizationToken, cartId, cartData) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let loggedInUserId = loggedInUser.data;

        let createUpdateData = functionToCreateUpdateData(cartData);

        if (!createUpdateData.success) return createUpdateData;

        let updateData = createUpdateData.data;
        console.log('Date:', new Date(), 'Update data:', updateData);

        let updateCartDetails = await functionToUpdateCartItem(loggedInUserId, cartId, updateData);

        return updateCartDetails;
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const deleteCartService = async (authorizationToken, cartId) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let deleteCartItem = await functionToDeleteCartItem(cartId);

        return deleteCartItem;
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

module.exports = {
    addCartService,
    viewCartService,
    updateCartService,
    deleteCartService
};