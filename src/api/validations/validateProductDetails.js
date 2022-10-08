// * Function to validate essential details of the products.
const validateProductDetails = (productObject) => {
    let verifiedProductDetails = {};
    let unverifiedProductDetails = {};

    const { title, description, price, quantity, listingStatus  } = productObject;

    // * checks if one or all required data is missing for the products.
    if (!title || !description || !price || !quantity || !listingStatus) {
        console.log(new Date(), "Product details before validation:", productObject);
        unverifiedProductDetails = productObject;
        console.log(new Date(), "Unverified because product details missing:", unverifiedProductDetails);
    }
    else {
        verifiedProductDetails = productObject;
    }

    return {
        verifiedProductDetails,
        unverifiedProductDetails
    };
}

module.exports = validateProductDetails;