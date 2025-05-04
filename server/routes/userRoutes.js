
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateUserProfile);

module.exports = router;
