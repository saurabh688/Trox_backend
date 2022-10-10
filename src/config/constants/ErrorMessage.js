const ErrorMessage = {
    Product_Error: {
        Error_1: 'Added some of the products!',
        Error_2: 'No product details provided!',
        Error_3: 'Required data missing for the list of product details, Required data: productName, productCategory, price, description, batchNumber, skuID',
        Error_4: 'Could not add any product!',
        Error_5: 'Cannot update without product ID!',
        Error_6: 'Products does not exist!',
        Error_7: 'Sorry could not update product details!',
        Error_8: 'No product found!',
        Error_9: 'Cannot delete without product ID!',
        Error_10: 'Sorry could not delete product!',
        Error_11: 'Cannot view without product ID!',
        Error_12: 'Search query cannot be null or undefined!',
        Error_13: 'Searched products not found!'
    },
    User_Error: {
        Error_1: 'Please enter your email ID!',
        Error_2: 'Please enter your password!',
        Error_3: 'You are not registered with us. Please sign up with Trox!',
        Error_4: 'Could not update user!',
        Error_5: 'User not found!'
    }
}

module.exports = ErrorMessage;