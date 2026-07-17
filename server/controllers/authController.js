const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    console.log('📝 Registration request received:', req.body);

    const { fullName, email, phone, password } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !password) {
      console.log('❌ Missing fields:', { fullName, email, phone, password });
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Check if user exists
    console.log('🔍 Checking for existing user...');
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }]
      }
    });

    if (existingUser) {
      console.log('❌ User already exists:', existingUser.email);
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email or phone'
      });
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log('👤 Creating user...');
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        passwordHash: hashedPassword,
        balance: 0,
        isAdmin: false,
        isActive: true
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        balance: true,
        isAdmin: true,
        isActive: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log('✅ User created:', user.email);

    // Generate token with isAdmin included
    console.log('🔑 Generating JWT token...');
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        isAdmin: user.isAdmin  // ✅ ADD THIS
      },
      process.env.JWT_SECRET || 'fallback_secret_key_123',
      { expiresIn: '7d' }
    );

    console.log('✅ Registration successful!');
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('❌ Register error DETAILS:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Server error during registration',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const login = async (req, res) => {
  try {
    console.log('📝 Login request received:', req.body.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    if (!user.isActive) {
      console.log('❌ User account deactivated:', email);
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // ✅ FIX: Generate token with isAdmin included
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        isAdmin: user.isAdmin  // ✅ ADD THIS
      },
      process.env.JWT_SECRET || 'fallback_secret_key_123',
      { expiresIn: '7d' }
    );

    // ✅ FIX: Remove password hash but keep ALL other fields including isAdmin
    const { passwordHash, ...userWithoutPassword } = user;
    
    // ✅ DEBUG: Log the user data to verify isAdmin
    console.log('✅ Login successful for:', email);
    console.log('📊 User data:', { 
      id: user.id, 
      email: user.email, 
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      balance: user.balance
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword  // This includes isAdmin ✅
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    console.log('📝 Profile request for user:', req.user.id);

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        balance: true,
        isAdmin: true,
        isActive: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    console.log('✅ Profile fetched for:', user.email);
    console.log('📊 isAdmin:', user.isAdmin);

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('❌ Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = { register, login, getProfile };