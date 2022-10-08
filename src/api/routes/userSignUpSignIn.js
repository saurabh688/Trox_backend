const router = require('express').Router();

const { userSignIn } = require('../controllers/userSignUpSignInController');

router.post('/signIn', userSignIn);

module.exports = router;