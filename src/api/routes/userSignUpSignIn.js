const router = require('express').Router();

const { userSignUp, userSignIn, verifyOTP, resendOTP } = require('../controllers/userSignUpSignInController');

router.post('/signUp', userSignUp);
router.post('/signIn', userSignIn);
router.post('/user/verify', verifyOTP);
router.post('/resendOTP', resendOTP);

module.exports = router;