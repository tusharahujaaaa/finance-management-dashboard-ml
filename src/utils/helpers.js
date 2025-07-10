const bcrypt = require('bcryptjs');

/**
 * Hash password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} - Match result
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} - Random string
 */
const generateRandomString = (length = 10) => {
  return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted currency
 */
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get date range for filtering
 * @param {string} period - Period (today, week, month, year)
 * @returns {Object} - Start and end dates
 */
const getDateRange = (period) => {
  const now = new Date();
  let startDate, endDate;

  switch (period) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      break;
    case 'week':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      endDate = now;
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear() + 1, 0, 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  return { startDate, endDate };
};

module.exports = {
  hashPassword,
  comparePassword,
  generateRandomString,
  formatCurrency,
  isValidEmail,
  getDateRange
};
