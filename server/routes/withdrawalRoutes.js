// server/routes/withdrawalRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.use(protect);

// Placeholder routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Withdrawals route working' });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Withdrawal request received' });
});

module.exports = router;