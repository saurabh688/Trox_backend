const validateOrderItem = (itemObj) => {
    let { productId, title, description, brand, quantity, price, salePrice } = itemObj;

    if (!productId || !title || !description || !brand || !quantity || !price || !salePrice) return {
        success: false,
        message: "Please provide required details: 'Product Id', 'Title', 'Description', 'Brand', 'Quantity', 'Price', 'Sale Price'!"
    }

    if (!(typeof quantity == 'number') || !(typeof price == 'number') || !(typeof salePrice == 'number')) return {
        success: false,
        message: "Should be a real number: 'Quantity', 'Price', 'Sale Price'!"
    }

    return {
        success: true,
        message: 'Data verified!',
        data: itemObj
    }
};

module.exports = validateOrderItem;