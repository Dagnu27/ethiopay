const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Welcome route
app.get('/', (req, res) => {
  res.json({
    name: '🚀 EthioPay API',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      testDatabase: 'GET /api/test-db',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login'
    },
    documentation: 'Coming soon!'
  });
});

// Middleware
app.use(cors());
app.use(express.json());

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL}`);
});