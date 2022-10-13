const router = require('express').Router();

const { viewAllProduct, viewProductPagination, viewProductDetails, addProduct, updateProduct, deleteProduct, searchProduct } = require('../controllers/productController');

router.get('/product/:productId/viewProduct', viewProductDetails);
router.get('/product/searchProduct', searchProduct);
router.get('/product/viewProduct', viewProductPagination);
router.get('/product/viewAll', viewAllProduct);
router.put('/product/:id/updateProduct', updateProduct);
router.post('/product/addProduct', addProduct);
router.delete('/product/:id/deleteProduct', deleteProduct)

module.exports = router;