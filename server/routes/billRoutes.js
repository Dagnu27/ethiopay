// server/routes/billRoutes.js
const express = require('express');
const router = express.Router();
const { getMyBills, payBill } = require('../controllers/billController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Get user's bills
router.get('/', getMyBills);

// Pay a bill
router.post('/:billId/pay', payBill);

module.exports = router;