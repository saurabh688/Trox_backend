const validateCartDetails = (cartData) => {
    let { title, description, userId, price, quantity, listingStatus } = cartData;

    if (!title || !description || !userId || !price || !quantity || !listingStatus) return {
        success: false,
        message: "Cart Data missing, Required data: 'title', 'description', 'userId', 'price', 'quantity', 'listingStatus'"
    }; 

    return {
        success: true,
        message: 'Data verified!',
        data: cartData
    };
}

module.exports = validateCartDetails;