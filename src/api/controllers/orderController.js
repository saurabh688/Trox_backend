const ErrorMessage = require('../../config/constants/ErrorMessage');
const { addOrderService, getOrderService } = require('../services/orderService');

const addOrder = async (req, res) => {
    let order = await addOrderService(req.headers.authorization, req.body);

    if (order.success) {
        res
        .status(201)
        .json(order);
    }
    else if (!order.success && order.message == ErrorMessage.User_Error.Error_12) {
        res
        .status(401)
        .json(order);
    }
    else if (!order.success && order.message == ErrorMessage.User_Error.Error_5 ) {
        res
        .status(404)
        .json(order);
    }
};

const getOrder = async (req, res) => {

};

module.exports = {
    addOrder,
    getOrder
};