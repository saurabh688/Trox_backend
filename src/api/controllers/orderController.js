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
    else if (!order.success) {
        res
        .status(400)
        .json(order);
    }
};

const getOrder = async (req, res) => {
    let order = await getOrderService(req.headers.authorization);

    if (order.success) {
        res
        .status(200)
        .json(order);
    } else {
        res
        .status(400)
        .json(order);
    }
};

module.exports = {
    addOrder,
    getOrder
};