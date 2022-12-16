const { Op } = require('sequelize');

const Order = require('../models/t_order.model');
const Order_Product_Mapping = require('../models/t_order_product_mapping.model');

const { validateLoggedInUser } = require('../services/userService');
const validateOrderDetails = require('../validations/validateOrderDetails');
const validateOrderItem = require('../validations/validateOrderItem');

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

const functionToCreateMapping = async (orderItemArr, orderId) => {
    try {
        const createMapping = await Order_Product_Mapping.bulkCreate(orderItemArr);

        if (createMapping.length == 0) {
            let deleteOrder = await Order.destroy({
                where: {
                    id: orderId
                },
                returning: true
            });

            console.log('Date:', new Date(), 'delete order:', deleteOrder);
            
            return {
                success: false,
                message: 'Could add any item to order!'
            }
        }

        let mappingData = createMapping.map(item => item.dataValues);

        return {
            success: true,
            message: 'Mapping item have been added!',
            data: mappingData
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const functionToViewOrders = async (userId) => {
    try {
        let getOrders = await Order.findAll({
            where: {
                userId: userId
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        if (getOrders.length < 1) return {
            success: false,
            message: 'Could not find the order for the user!'
        }

        let orderIdList = getOrders.map(order => order.dataValues.id);

        let getOrderItems = await Order_Product_Mapping.findAll({
            where: {
                orderId: {
                    [Op.in]: orderIdList
                }
            }
        });

        if (getOrderItems.length < 1) return {
            success: false,
            message: 'Could not find any ordered Item!'
        };

        let orderArray = [];
        for (let index in getOrders) {
            let orderId = getOrders[index].dataValues.id;
            console.log('Date:', new Date(), 'orderId:', orderId);
            let orderItemList = getOrderItems.filter(item => item.dataValues.orderId == orderId).map(item => item.dataValues);
            console.log('Date:', new Date(), 'filtered item list:', orderItemList);
            getOrders[index].dataValues.itemArr = orderItemList;
            console.log('Date:', new Date(), 'ordered items:', getOrders[index].dataValues.itemArr)
            orderArray = [...orderArray, getOrders[index].dataValues];
        }

        return {
            success: true,
            message: 'Order details fetched!',
            data: orderArray
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

        let verifiedArr = [];
        let rejectedArr = [];

        for (let index in data.itemArr) {
            let validateItem = validateOrderItem(data.itemArr[index]);

            if (!validateItem.success) {
                data.itemArr[index].message = validateItem.message;
                rejectedArr = [...rejectedArr, data.itemArr[index]];
            }
            else {
                verifiedArr = [...verifiedArr, validateItem.data];
            }
        }

        console.log('Date:', new Date(), 'Verified Order Item Arr:', verifiedArr);
        console.log('Date:', new Date(), 'Rejected Order Item Arr:', rejectedArr);

        let totalPrice = 0.0;
        let totalSellerAmount = 0.0;

        for (let order in verifiedArr) {
            totalPrice += verifiedArr[order].price * verifiedArr[order].quantity;
            totalSellerAmount += verifiedArr[order].salePrice * verifiedArr[order].quantity;
        }

        data.totalPrice = totalPrice;
        data.totalSellerAmount = totalSellerAmount;
        data.itemArr = verifiedArr;
        data.userId = loggedInUserId;

        let validateOrder = validateOrderDetails(data);

        console.log('Date:', new Date(), "Validate order details:", validateOrder);

        if (!validateOrder.success) return validateOrder;

        let orderCreationObject = {
            ...validateOrder.data,
            userId: loggedInUserId
        };

        let generateOrder = await functionToCreateOrder(orderCreationObject);
        
        if (!generateOrder.success) return generateOrder;

        let orderId = generateOrder.data.id;

        verifiedArr = verifiedArr.map(item => {
            item.orderId = orderId;
            item.createdBy = loggedInUserId;
            item.updateBy = loggedInUserId;

            return item;
        });
        
        let generateMapping = await functionToCreateMapping(verifiedArr);

        if (!generateMapping.success) return generateMapping;

        return {
            success: true,
            message: 'Order Generated!',
            data: {
                orderData: generateOrder.data,
                orderItem: generateMapping.data,
                rejectedItem: rejectedArr
            }
        }
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
    getOrderService
}