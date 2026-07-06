// server/routes/qrRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Generate QR code
router.post('/generate', (req, res) => {
  res.json({
    success: true,
    message: 'QR code generated successfully',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANS...', // Placeholder
    amount: req.body.amount || 0,
    description: req.body.description || 'Payment',
    expiresAt: new Date(Date.now() + 300000)
  });
});

// Scan QR code
router.post('/scan', (req, res) => {
  res.json({
    success: true,
    message: 'QR payment processed successfully',
    transaction: {
      id: 'qr-tx-123',
      amount: 100,
      status: 'completed'
    },
    newBalance: 4500
  });
});

module.exports = router;