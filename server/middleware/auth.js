// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Not authorized - No token provided' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_123');
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        balance: true,
        isAdmin: true,
        isActive: true,
        profileImage: true
      }
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Not authorized - User not found' 
      });
    }
    
    if (!user.isActive) {
      return res.status(401).json({ 
        success: false,
        error: 'Account is deactivated' 
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Auth middleware error:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token expired' 
      });
    }
    res.status(401).json({ 
      success: false,
      error: 'Not authorized' 
    });
  }
};

// EXPORT - Make sure this is at the bottom!
module.exports = { protect };