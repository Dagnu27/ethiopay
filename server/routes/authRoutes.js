const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

//  Make sure all controller functions exist
console.log('🔍 Auth Controller:', { register, login, getProfile });

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);

module.exports = router;