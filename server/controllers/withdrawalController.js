// server/controllers/withdrawalController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Request withdrawal
const requestWithdrawal = async (req, res) => {
  try {
    const { amount, method, accountInfo } = req.body;
    const userId = req.user.id;

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

    // Check balance
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user.balance < amount) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient balance'
      });
    }

    // Create withdrawal request
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId,
        amount,
        status: 'pending',
        method,
        accountInfo,
        reference: `WD-${Date.now()}-${Math.random().toString(36).substring(7)}`
      }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        title: 'Withdrawal Requested',
        message: `Your withdrawal of ${amount} ETB has been requested. Please wait for approval.`,
        type: 'info'
      }
    });

    res.json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      withdrawal
    });
  } catch (error) {
    console.error('Withdrawal request error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process withdrawal request'
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

module.exports = { requestWithdrawal, getWithdrawals };