const router = require('express').Router();

const { userSignUp, userSignIn } = require('../controllers/userSignUpSignInController');

router.post('/signUp', userSignUp);
router.post('/signIn', userSignIn);

module.exports = router;