const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMyProfile } = require('../controllers/userController');

// import Auth Middleware
const auth = require('../middleware/auth');


router.post('/register', auth, registerUser);
router.post('/login', auth, loginUser);
router.get('/my-profile', auth, getMyProfile);


module.exports = router;