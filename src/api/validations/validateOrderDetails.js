const validateOrderDetails = (data) => {
    let { userId, buyerAddress, shippingAddress, totalPrice, totalSellerAmount, itemArr } = data;

    if (!userId || !buyerAddress  || !shippingAddress || !totalPrice || !totalSellerAmount || itemArr.length == 0) return {
        success: false,
        message: "Please provide all required details, required details: 'Seller ID', 'Item Array', 'Buyer Address', 'Shipping Address', 'Total Price', 'Total Seller Amount'"
    };

    if (!(typeof totalPrice == 'number')) return {
        success: false,
        message: 'Total price should be a real number!'
    }

    if (!(typeof totalSellerAmount == 'number')) return {
        success: false,
        message: 'Total seller amount should be a real number!'
    }

    return {
        success: true,
        message: 'Details validated',
        data: data
    }
};

module.exports = validateOrderDetails;