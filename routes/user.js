const express = require('express');

// controller functions
const { user, loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();

//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

// router.get('/user',user);

module.exports = router