const router = require('express').Router();
const passport = require('passport');

const { userSignUp, userSignIn, verifyOTP, resendOTP, getUser } = require('../controllers/userSignUpSignInController');

require('../middleware/passport');

router.post('/signUp', userSignUp);
router.post('/signIn', userSignIn);
router.post('/user/verify', verifyOTP);
router.post('/resendOTP', resendOTP);
router.get('/user/detail', passport.authenticate('jwt', { session: false }), getUser)

module.exports = router;