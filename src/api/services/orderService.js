const { Op } = require('sequelize');

const Order = require('../models/t_order.model');

const { validateLoggedInUser } = require('../services/userService');
const validateOrderDetails = require('../validations/validateOrderDetails');

const functionToCreateOrder = async (orderData) => {
    try {
        const createOrder = await Order.create(orderData);
        console.log('Date:', new Date(), 'Create order response:', createOrder);

        if (!createOrder) return {
            success: false,
            message: 'Could not create order!'
        };

        return {
            success: true,
            message: 'Order has been created!',
            data: createOrder.dataValues
        }
    }   
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const functionToViewOrders = async (userId) => {
    try {
        let getOrders = await Order.findAll({
            where: {
                userId
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        if (getOrders.length == 0) return {
            success: false,
            message: 'Could not find the order for the user!'
        }

        let orderData = getOrders.map(order => order.dataValues);

        return {
            success: true,
            message: 'Order details fetched!',
            data: orderData
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const addOrderService = async (authorizationToken, data) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let loggedInUserId = loggedInUser.data;

        let validateOrder = validateOrderDetails(data);

        if (!validateOrder.success) return validateOrder;

        let orderCreationObject = {
            ...validateOrder.data,
            userId: loggedInUserId
        };

        let generateOrder = await functionToCreateOrder(orderCreationObject);

        return generateOrder;
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const updateOrderService = async (authorizationToken, data) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log("Date:", new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let loggedInUserId = loggedInUser.data;
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

const getOrderService = async (authorizationToken) => {
    try {
        let loggedInUser = await validateLoggedInUser(authorizationToken);
        console.log('Date:', new Date(), 'Response of validate logged in user:', loggedInUser);

        if (!loggedInUser.success) return loggedInUser;

        let loggedInUserId = loggedInUser.data;

        const searchOrders = await functionToViewOrders(loggedInUserId);

        return searchOrders;
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
};

module.exports = {
    addOrderService,
    updateOrderService,
    getOrderService
}