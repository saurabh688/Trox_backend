const router = require('express').Router();
const passport = require('passport');
const { addCart, viewCart, updateCart } = require('../controllers/cartController');

require('../middleware/passport')(passport);

router.post('/cart/addCart', passport.authenticate('jwt', { session: false }), addCart);
router.get('/cart/viewCart', passport.authenticate('jwt', { session: false }), viewCart);
router.put('/cart/updateCart/:id', passport.authenticate('jwt', { session: false }), updateCart);

module.exports = router;