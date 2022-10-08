const ErrorMessage = require('../../config/constants/ErrorMessage');
const { viewAllProductService, viewProductPaginationService, addProductService, updateProductService, deleteProductService } = require('../services/productService');

const viewAllProduct = async (req, res) => {
    const productsList = await viewAllProductService();
    console.log("Date:", new Date(), 'Data returned to view list of product:', productsList)

    if (productsList.success) {
        res
        .status(200)   
        .json(productsList);
    }
    else if (!productsList.success && productsList.message == ErrorMessage.Product_Error.Error_8) {
        res
        .status(404)
        .json(productsList);
    }
    else if (!productsList.success) {
        res
        .status(400)
        .json(productsList);
    }
};

const viewProductPagination = async (req, res) => {
    console.log("Date:", new Date(), "Current page:", req.query.page);
    const productList = await viewProductPaginationService(req.query.page);
    console.log("Date:", new Date(), 'Data returned to view list of paginated product:', productList);

    if (productList.success) {
        res
        .status(200)
        .json(productList);
    }
    else if (!productList.success && productList.message == ErrorMessage.Product_Error.Error_8) {
        res
        .status(404)
        .json(productList);
    }
    else if (!productList.success) {
        res
        .status(400)
        .json(productList);
    }
}

const addProduct = async (req, res) => {
    console.log("Date:", new Date(),"Product details from controller:", req.body)
    const productsList = await addProductService(req.body);
    console.log("Date:", new Date(), 'Data returned after adding products:', productsList);

    if (productsList.success) {
        res
        .status(201)
        .json(productsList);
    }
    else if (productsList.success && productsList.message == ErrorMessage.Product_Error.Error_1) {
        res
        .status(206)
        .json(productsList);
    }
    else if (!productsList.success && productsList.message == ErrorMessage.Product_Error.Error_2 || productsList.message == ErrorMessage.Product_Error.Error_3 || productsList.message == ErrorMessage.Product_Error.Error_4) {
        res
        .status(404)
        .json(productsList);
    }
    else if (!productsList.success){
        res
        .status(400)
        .json(productsList);
    }
}

const updateProduct = async (req, res) => {
    console.log("Date:", new Date(), "Product ID from controller:", req.params.id);
    console.log("Date:", new Date(), "Product details from controller:", req.body);
    const productsList = await updateProductService(req.body, req.params.id);
    console.log("Date:", new Date(), "Data returned after updating product details:", productsList);

    if (productsList.success) {
        res
        .status(200)
        .json(productsList);
    }
    else if (!productsList.success && productsList.message == ErrorMessage.Product_Error.Error_5 || productsList.message == ErrorMessage.Product_Error.Error_3 || productsList.message == ErrorMessage.Product_Error.Error_6 || productsList.message == ErrorMessage.Product_Error.Error_7) {
        res
        .status(404)
        .json(productsList);
    }
    else if (!productsList.success) {
        res
        .status(400)
        .json(productsList);
    }
}

const deleteProduct = async (req, res) => {
    console.log("Date:", new Date(), "Product Id from controller:", req.params.id);
    const product = await deleteProductService(req.params.id);
    console.log("Date:", new Date(), "Data returned after deleting product:", product);

    if (product.success) {
        res
        .status(200)
        .json(product);
    }
    else if (!product.success && product.message == ErrorMessage.Product_Error.Error_9 || product.message == ErrorMessage.Product_Error.Error_10) {
        res
        .status(404)
        .json(product);
    }
    else if (!product.success) {
        res
        .status(400)
        .json(product);
    }
}

module.exports = {
    viewAllProduct,
    viewProductPagination,
    addProduct,
    updateProduct,
    deleteProduct
};