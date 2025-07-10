const express = require('express');
const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/summary', (req, res) => {
  res.json({ message: 'Dashboard summary route - coming soon' });
});

router.get('/recent-transactions', (req, res) => {
  res.json({ message: 'Recent transactions route - coming soon' });
});

router.get('/quick-stats', (req, res) => {
  res.json({ message: 'Quick stats route - coming soon' });
});

module.exports = router;
