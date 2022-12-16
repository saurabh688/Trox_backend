const validateCartDetails = (cartData) => {
    let { title, description, userId, productId, price, quantity, listingStatus } = cartData;

    if (!title || !description || !userId || !productId || !price || !quantity || !listingStatus) return {
        success: false,
        message: "Cart Data missing, Required data: 'title', 'description', 'userId', 'productId', 'price', 'quantity', 'listingStatus'"
    }; 

    if (!(typeof price == 'number') || !(typeof quantity == 'number')) return {
        success: false,
        message: 'Price or Quantity should be numbers!'
    }

    return {
        success: true,
        message: 'Data verified!',
        data: cartData
    };
}

module.exports = validateCartDetails;