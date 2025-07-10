const { PrismaClient } = require('@prisma/client');
const {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} = require('../../utils/helpers');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class AuthService {
  // Register a new user
  async register(userData) {
    const { email, password, name, avatar } = userData;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null,
          avatar: avatar || null,
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Generate tokens
      const accessToken = generateToken({ userId: user.id });
      const refreshToken = generateToken(
        { userId: user.id, type: 'refresh' },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        '7d'
      );

      return {
        user,
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    const { email, password } = credentials;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated. Please contact support.');
      }

      // Verify password
      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Generate tokens
      const accessToken = generateToken({ userId: user.id });
      const refreshToken = generateToken(
        { userId: user.id, type: 'refresh' },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        '7d'
      );

      // Return user data (excluding password) and tokens
      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Get user profile
  async getProfile(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              transactions: true,
              categories: true,
              budgets: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      const { email, name, avatar } = updateData;

      // If email is being updated, check if it's already taken
      if (email) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email,
            id: { not: userId },
          },
        });

        if (existingUser) {
          throw new Error('Email is already taken');
        }
      }

      // Update user profile
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(email && { email }),
          ...(name !== undefined && { name }),
          ...(avatar !== undefined && { avatar }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(userId, passwords) {
    const { currentPassword, newPassword } = passwords;

    try {
      // Get user with current password
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValidPassword = await comparePassword(
        currentPassword,
        user.password
      );

      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const hashedNewPassword = await hashPassword(newPassword);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedNewPassword,
        },
      });

      return { message: 'Password updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Refresh access token
  async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'refresh_secret'
      );

      if (!decoded || decoded.type !== 'refresh') {
        throw new Error('Invalid refresh token');
      }

      // Check if user exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          isActive: true,
        },
      });

      if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
      }

      // Generate new access token
      const accessToken = generateToken({ userId: user.id });

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Deactivate user account
  async deactivateAccount(userId) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          isActive: false,
        },
        select: {
          id: true,
          email: true,
          isActive: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get user statistics
  async getUserStats(userId) {
    try {
      const stats = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          _count: {
            select: {
              transactions: true,
              categories: true,
              budgets: true,
            },
          },
          transactions: {
            select: {
              amount: true,
              type: true,
              date: true,
            },
            orderBy: { date: 'desc' },
            take: 1,
          },
        },
      });

      if (!stats) {
        throw new Error('User not found');
      }

      return {
        totalTransactions: stats._count.transactions,
        totalCategories: stats._count.categories,
        totalBudgets: stats._count.budgets,
        lastTransaction: stats.transactions[0] || null,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
