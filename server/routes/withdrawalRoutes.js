// server/routes/withdrawalRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Get withdrawal history
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Withdrawals route working',
    withdrawals: []
  });
});

// Request withdrawal
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Withdrawal request received',
    withdrawal: {
      id: 'placeholder-' + Date.now(),
      amount: req.body.amount || 0,
      method: req.body.method || 'bank',
      accountInfo: req.body.accountInfo || '',
      status: 'pending',
      createdAt: new Date()
    }
  });
});

module.exports = router;