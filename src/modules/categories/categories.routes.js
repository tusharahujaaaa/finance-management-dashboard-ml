const express = require('express');
const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/', (req, res) => {
  res.json({ message: 'Get categories route - coming soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create category route - coming soon' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update category route - coming soon' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete category route - coming soon' });
});

module.exports = router;
