// server/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const {
  sendMoney,
  getTransactionHistory,
  getBalance,
  getTransactionStats
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.post('/send', sendMoney);
router.get('/history', getTransactionHistory);
router.get('/balance', getBalance);
router.get('/stats', getTransactionStats);

module.exports = router;