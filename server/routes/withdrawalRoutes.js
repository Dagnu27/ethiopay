// server/routes/withdrawalRoutes.js
const express = require('express');
const router = express.Router();
const {
  requestWithdrawal,
  getWithdrawals,
  getWithdrawalStats,
  approveWithdrawal
} = require('../controllers/withdrawalController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// User routes
router.post('/', requestWithdrawal);
router.get('/', getWithdrawals);
router.get('/stats', getWithdrawalStats);

// Admin routes
router.put('/:withdrawalId/approve', approveWithdrawal);

module.exports = router;