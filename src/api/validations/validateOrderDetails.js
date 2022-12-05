const validateOrderDetails = (data) => {
    let { sellerId, shippingAddress, totalPrice, totalSellerAmount } = data;

    if (!sellerId || !shippingAddress || !totalPrice || !totalSellerAmount) return {
        success: false,
        message: "Please provide all required details, required details: 'Seller ID', 'Shipping Address', 'Total Price', 'Total Seller Amount'"
    };

    if (isNaN(totalPrice)) return {
        success: false,
        message: 'Total price should be a real number!'
    }

    if (isNaN(totalSellerAmount)) return {
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