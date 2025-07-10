const express = require('express');
const authController = require('./auth.controller');
const authMiddleware = require('../../middleware/auth');
const { validateRequest } = require('./auth.validation');
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  refreshTokenSchema,
} = require('./auth.validation');

const router = express.Router();

// Public routes (no authentication required)
router.post(
  '/register',
  validateRequest(registerSchema),
  authController.register
);

router.post('/login', validateRequest(loginSchema), authController.login);

router.post(
  '/refresh',
  validateRequest(refreshTokenSchema),
  authController.refreshToken
);

// Protected routes (authentication required)
router.use(authMiddleware); // Apply auth middleware to all routes below

router.get('/profile', authController.getProfile);

router.put(
  '/profile',
  validateRequest(updateProfileSchema),
  authController.updateProfile
);

router.put(
  '/change-password',
  validateRequest(changePasswordSchema),
  authController.changePassword
);

router.post('/logout', authController.logout);

router.delete('/deactivate', authController.deactivateAccount);

router.get('/stats', authController.getUserStats);

router.get('/verify', authController.verifyToken);

module.exports = router;
