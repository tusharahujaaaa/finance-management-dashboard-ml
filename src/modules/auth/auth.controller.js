const authService = require('./auth.service');

class AuthController {
  // Register a new user
  async register(req, res) {
    try {
      const result = await authService.register(req.body);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
          user: result.user,
          tokens: result.tokens,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message || 'Registration failed',
        data: null,
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const result = await authService.login(req.body);

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: result.user,
          tokens: result.tokens,
        },
      });
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: error.message || 'Login failed',
        data: null,
      });
    }
  }

  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.userId;
      const user = await authService.getProfile(userId);

      res.status(200).json({
        status: 'success',
        message: 'Profile retrieved successfully',
        data: { user },
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        message: error.message || 'Failed to retrieve profile',
        data: null,
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const updatedUser = await authService.updateProfile(userId, req.body);

      res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: { user: updatedUser },
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message || 'Failed to update profile',
        data: null,
      });
    }
  }

  // Change password
  async changePassword(req, res) {
    try {
      const userId = req.user.userId;
      const result = await authService.changePassword(userId, req.body);

      res.status(200).json({
        status: 'success',
        message: result.message,
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message || 'Failed to change password',
        data: null,
      });
    }
  }

  // Refresh access token
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);

      res.status(200).json({
        status: 'success',
        message: 'Token refreshed successfully',
        data: {
          accessToken: result.accessToken,
          user: result.user,
        },
      });
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: error.message || 'Token refresh failed',
        data: null,
      });
    }
  }

  // Logout user (client-side token removal)
  async logout(req, res) {
    try {
      // Since we're using stateless JWT, logout is handled client-side
      // But we can log the logout event or add token to blacklist if needed

      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Logout failed',
        data: null,
      });
    }
  }

  // Deactivate user account
  async deactivateAccount(req, res) {
    try {
      const userId = req.user.userId;
      const result = await authService.deactivateAccount(userId);

      res.status(200).json({
        status: 'success',
        message: 'Account deactivated successfully',
        data: { user: result },
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message || 'Failed to deactivate account',
        data: null,
      });
    }
  }

  // Get user statistics
  async getUserStats(req, res) {
    try {
      const userId = req.user.userId;
      const stats = await authService.getUserStats(userId);

      res.status(200).json({
        status: 'success',
        message: 'User statistics retrieved successfully',
        data: { stats },
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        message: error.message || 'Failed to retrieve user statistics',
        data: null,
      });
    }
  }

  // Verify token endpoint (for frontend token validation)
  async verifyToken(req, res) {
    try {
      const userId = req.user.userId;
      const user = await authService.getProfile(userId);

      res.status(200).json({
        status: 'success',
        message: 'Token is valid',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
          },
        },
      });
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid token',
        data: null,
      });
    }
  }
}

module.exports = new AuthController();
