// server/controllers/adminController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const [
      totalUsers,
      totalTransactions,
      totalBills,
      totalWithdrawals,
      totalRevenue,
      pendingWithdrawals
    ] = await Promise.all([
      prisma.user.count(),
      prisma.transaction.count(),
      prisma.bill.count(),
      prisma.withdrawal.count(),
      prisma.transaction.aggregate({
        where: { status: 'completed' },
        _sum: { fee: true }
      }),
      prisma.withdrawal.count({
        where: { status: 'pending' }
      })
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTransactions,
        totalBills,
        totalWithdrawals,
        totalRevenue: totalRevenue._sum.fee || 0,
        pendingWithdrawals
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard stats'
    });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const { limit = 50, offset = 0 } = req.query;
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        balance: true,
        isAdmin: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: {
            sentTransactions: true,
            receivedTransactions: true,
            withdrawals: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset)
    });

    const totalCount = await prisma.user.count();

    res.json({
      success: true,
      users,
      pagination: {
        total: totalCount,
        limit: Number(limit),
        offset: Number(offset)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
};

// Get all transactions (admin only)
const getAllTransactions = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const { limit = 50, offset = 0 } = req.query;
    const transactions = await prisma.transaction.findMany({
      include: {
        sender: { select: { fullName: true, email: true } },
        receiver: { select: { fullName: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset)
    });

    const totalCount = await prisma.transaction.count();

    res.json({
      success: true,
      transactions,
      pagination: {
        total: totalCount,
        limit: Number(limit),
        offset: Number(offset)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions'
    });
  }
};

// Toggle user status (activate/deactivate)
const toggleUserStatus = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive }
    });

    res.json({
      success: true,
      message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'}`,
      user: updatedUser
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user status'
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllTransactions,
  toggleUserStatus
};