const ErrorMessage = require('../../config/constants/ErrorMessage');
const { addCartService, viewCartService, updateCartService, deleteCartService } = require('../services/cartService');

const addCart = async (req, res) => {
    console.log('Date:', new Date(), 'authorization token:', req.headers.authorization);
    console.log('Date:', new Date(), 'request body:', req.body);

    const cart = await addCartService(req.headers.authorization, req.body);
    console.log('Date:', new Date(), 'Data returned from add to cart service:', cart);

    if (cart.success) {
        res
        .status(201)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_12) {
        res
        .status(401)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_5 || cart.message == ErrorMessage.Cart_Error.Error_1 || cart.message == ErrorMessage.Cart_Error.Error_2) {
        res
        .status(404)
        .json(cart);
    }
    else if (!cart.success) {
        res
        .status(400)
        .json(cart);
    }
}

const viewCart = async (req, res) => {
    const cart = await viewCartService(req.headers.authorization);
    console.log('Date:', new Date(), 'Data returned from view cart service:', cart);

    if (cart.success) {
        res
        .status(200)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_12) {
        res
        .status(401)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_5 || cart.message == ErrorMessage.Cart_Error.Error_3) {
        res
        .status(404)
        .json(cart);
    }
    else if (!cart.success) {
        res
        .status(400)
        .json(cart);
    }
}

const updateCart = async (req, res) => {
    const cart = await updateCartService(req.headers.authorization, req.params.id, req.body);
    console.log('Date:', new Date(), 'Data returned from update cart service:', cart);

    if (cart.success) {
        res
        .status(200)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_12) {
        res
        .status(401)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_5 || cart.message == ErrorMessage.Cart_Error.Error_4 || cart.message == ErrorMessage.Cart_Error.Error_5) {
        res
        .status(404)
        .json(cart);
    }
    else if (!cart.success) {
        res
        .status(400)
        .json(cart);
    }
}

const deleteCart = async (req, res) => {
    const cart = await deleteCartService(req.headers.authorization, req.params.id);
    console.log('Date:', new Date(), 'Data returned from delete cart service:', cart);

    if (cart.success) {
        res
        .status(200)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_12) {
        res
        .status(401)
        .json(cart);
    }
    else if (!cart.success && cart.message == ErrorMessage.User_Error.Error_5 || cart.message == ErrorMessage.Cart_Error.Error_6) {
        res
        .status(404)
        .json(cart);
    }
    else if (!cart.success) {
        res
        .status(400)
        .json(cart);
    }
}

module.exports = {
    addCart,
    viewCart,
    updateCart,
    deleteCart
}