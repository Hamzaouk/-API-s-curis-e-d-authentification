const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { jwtAuth, sessionAuth, basicAuth, authorize } = require('../middleware/auth');
const { registerValidator, loginValidator } = require('../validators/validator');

// Public routes
router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login); // JWT login
router.post('/login-session', loginValidator, authController.loginSession); // Session login
router.get('/basic', basicAuth, authController.basicAuth); // Basic Auth login

// JWT protected route
router.get('/me', jwtAuth, authController.getMe);

// Session protected route
router.get('/me-session', sessionAuth, authController.getMe);

// Role-based protected route
router.get('/admin', jwtAuth, authorize('admin'), (req, res) => {
  res.json({ success: true, msg: 'Admin access granted', data: {} });
});

// Logout route
router.get('/logout', authController.logout);

module.exports = router;