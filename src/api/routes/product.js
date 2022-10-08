const router = require('express').Router();

const { viewAllProduct, viewProductPagination, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.get('/product/viewProduct', viewProductPagination);
router.get('/product/viewAll', viewAllProduct);
router.put('/product/:id/updateProduct', updateProduct);
router.post('/product/addProduct', addProduct);
router.delete('/product/:id/deleteProduct', deleteProduct)

module.exports = router;