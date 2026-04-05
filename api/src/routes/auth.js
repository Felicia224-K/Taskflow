const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { registerValidator, loginValidator } = require('../middlewares/validators');

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);

module.exports = router;