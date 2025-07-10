const express = require('express');
const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/expense-by-category', (req, res) => {
  res.json({ message: 'Expense by category route - coming soon' });
});

router.get('/income-vs-expense', (req, res) => {
  res.json({ message: 'Income vs expense route - coming soon' });
});

router.get('/trends', (req, res) => {
  res.json({ message: 'Trends route - coming soon' });
});

router.get('/export', (req, res) => {
  res.json({ message: 'Export route - coming soon' });
});

module.exports = router;
