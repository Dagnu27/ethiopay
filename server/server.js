// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Import routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const billRoutes = require('./routes/billRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');
const qrRoutes = require('./routes/qrRoutes');           // ✅ MOVED HERE
const adminRoutes = require('./routes/adminRoutes');     // ✅ MOVED HERE

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({
    name: '🚀 EthioPay API',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      testDatabase: 'GET /api/test-db',
      auth: 'POST /api/auth/register, POST /api/auth/login, GET /api/auth/profile',
      transactions: 'POST /api/transactions/send, GET /api/transactions/history, GET /api/transactions/balance, GET /api/transactions/stats',
      bills: 'GET /api/bills, POST /api/bills/:billId/pay',
      withdrawals: 'POST /api/withdrawals, GET /api/withdrawals, PUT /api/withdrawals/:id/approve',
      qr: 'POST /api/qr/generate, POST /api/qr/scan',                    // ✅ ADDED
      admin: 'GET /api/admin/dashboard, GET /api/admin/users, GET /api/admin/transactions, PUT /api/admin/users/:id/toggle'  // ✅ ADDED
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'EthioPay API is running!',
    database: 'Connected'
  });
});

// Test database
app.get('/api/test-db', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ 
      success: true, 
      message: 'Database connected!',
      userCount: userCount
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ============================================
// ROUTES - All routes MUST be before 404 handler
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/qr', qrRoutes);           // ✅ ADDED
app.use('/api/admin', adminRoutes);     // ✅ ADDED

// ============================================
// 404 handler - MUST be LAST
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: Connected`);
});