// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Admin access required'
    });
  }
  next();
};

// Dashboard stats
router.get('/dashboard', isAdmin, (req, res) => {
  res.json({
    success: true,
    stats: {
      totalUsers: 3,
      totalTransactions: 10,
      totalBills: 5,
      totalWithdrawals: 6,
      totalRevenue: 50,
      pendingWithdrawals: 4
    }
  });
});

// Get all users
router.get('/users', isAdmin, (req, res) => {
  res.json({
    success: true,
    users: [
      { id: '1', fullName: 'Admin User', email: 'admin@ethiopay.com', isAdmin: true },
      { id: '2', fullName: 'Test User', email: 'user@ethiopay.com', isAdmin: false }
    ],
    pagination: { total: 2, limit: 50, offset: 0 }
  });
});

// Get all transactions
router.get('/transactions', isAdmin, (req, res) => {
  res.json({
    success: true,
    transactions: [
      { id: '1', amount: 100, type: 'send', status: 'completed' },
      { id: '2', amount: 50, type: 'send', status: 'pending' }
    ],
    pagination: { total: 2, limit: 50, offset: 0 }
  });
});

// Toggle user status
router.put('/users/:userId/toggle', isAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'User status toggled',
    user: { id: req.params.userId, isActive: true }
  });
});

module.exports = router;