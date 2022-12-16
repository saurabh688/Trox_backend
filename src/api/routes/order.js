const router = require('express').Router();
const passport = require('passport');
const { addOrder, getOrder } = require('../controllers/orderController');

require('../middleware/passport');

router.post('/order/add', passport.authenticate('jwt', { session: false }), addOrder);
router.get('/order/view', passport.authenticate('jwt', { session: false }), getOrder);

module.exports = router;