// server/controllers/withdrawalController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Request a withdrawal
const requestWithdrawal = async (req, res) => {
  try {
    const { amount, method, accountInfo } = req.body;
    const userId = req.user.id;

    console.log('📝 Withdrawal request:', { userId, amount, method, accountInfo });

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0'
      });
    }

    if (!method || !accountInfo) {
      return res.status(400).json({
        success: false,
        error: 'Method and account info are required'
      });
    }

    // Check user balance
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    console.log(`💰 User balance: ${user.balance}, Requesting: ${amount}`);

    if (user.balance < amount) {
      return res.status(400).json({
        success: false,
        error: `Insufficient balance. You have ${user.balance} ETB available`
      });
    }

    // Process withdrawal with transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Deduct from user balance
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: amount } }
      });

      console.log(`✅ Balance updated. New balance: ${updatedUser.balance}`);

      // 2. Create withdrawal record
      const withdrawal = await tx.withdrawal.create({
        data: {
          userId,
          amount,
          method,
          accountInfo,
          status: 'pending',
          reference: `WD-${Date.now()}-${Math.random().toString(36).substring(7)}`
        }
      });

      console.log(`✅ Withdrawal record created: ${withdrawal.id}`);

      // 3. Create notification
      await tx.notification.create({
        data: {
          userId,
          title: 'Withdrawal Requested',
          message: `Your withdrawal of ${amount} ETB via ${method} has been requested. Reference: ${withdrawal.reference}`,
          type: 'info'
        }
      });

      console.log('✅ Notification created');

      return { updatedUser, withdrawal };
    });

    console.log('✅ Withdrawal request completed successfully!');
    res.json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      withdrawal: result.withdrawal,
      newBalance: result.updatedUser.balance
    });
  } catch (error) {
    console.error('❌ Withdrawal request error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process withdrawal request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's withdrawal history
const getWithdrawals = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, limit = 20, offset = 0 } = req.query;

    const where = { userId };
    if (status) where.status = status;

    const withdrawals = await prisma.withdrawal.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset)
    });

    const totalCount = await prisma.withdrawal.count({ where });

    res.json({
      success: true,
      count: withdrawals.length,
      withdrawals,
      pagination: {
        total: totalCount,
        limit: Number(limit),
        offset: Number(offset)
      }
    });
  } catch (error) {
    console.error('Get withdrawals error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch withdrawals'
    });
  }
};

// Get withdrawal summary/stats
const getWithdrawalStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalWithdrawn = await prisma.withdrawal.aggregate({
      where: {
        userId,
        status: 'completed'
      },
      _sum: { amount: true }
    });

    const pendingWithdrawals = await prisma.withdrawal.count({
      where: {
        userId,
        status: 'pending'
      }
    });

    res.json({
      success: true,
      stats: {
        totalWithdrawn: totalWithdrawn._sum.amount || 0,
        pendingWithdrawals,
        totalRequests: await prisma.withdrawal.count({ where: { userId } })
      }
    });
  } catch (error) {
    console.error('Get withdrawal stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch withdrawal stats'
    });
  }
};

// Admin: Approve withdrawal
const approveWithdrawal = async (req, res) => {
  try {
    const { withdrawalId } = req.params;

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Only admins can approve withdrawals'
      });
    }

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id: withdrawalId },
      include: { user: true }
    });

    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        error: 'Withdrawal not found'
      });
    }

    if (withdrawal.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: `Withdrawal is already ${withdrawal.status}`
      });
    }

    const updatedWithdrawal = await prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'completed',
        processedAt: new Date()
      }
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId: withdrawal.userId,
        title: 'Withdrawal Approved',
        message: `Your withdrawal of ${withdrawal.amount} ETB has been approved and processed. Reference: ${withdrawal.reference}`,
        type: 'success'
      }
    });

    res.json({
      success: true,
      message: 'Withdrawal approved successfully',
      withdrawal: updatedWithdrawal
    });
  } catch (error) {
    console.error('Approve withdrawal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to approve withdrawal'
    });
  }
};

module.exports = {
  requestWithdrawal,
  getWithdrawals,
  getWithdrawalStats,
  approveWithdrawal
};