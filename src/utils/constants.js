const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const TRANSACTION_TYPES = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE'
};

const CATEGORY_TYPES = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE'
};

const DEFAULT_CATEGORIES = {
  INCOME: [
    { name: 'Salary', color: '#4CAF50' },
    { name: 'Freelance', color: '#2196F3' },
    { name: 'Investment', color: '#FF9800' },
    { name: 'Other Income', color: '#9C27B0' }
  ],
  EXPENSE: [
    { name: 'Food & Dining', color: '#FF5722' },
    { name: 'Transportation', color: '#607D8B' },
    { name: 'Shopping', color: '#E91E63' },
    { name: 'Entertainment', color: '#9C27B0' },
    { name: 'Bills & Utilities', color: '#795548' },
    { name: 'Healthcare', color: '#F44336' },
    { name: 'Education', color: '#3F51B5' },
    { name: 'Other Expenses', color: '#757575' }
  ]
};

module.exports = {
  HTTP_STATUS,
  TRANSACTION_TYPES,
  CATEGORY_TYPES,
  DEFAULT_CATEGORIES
};
