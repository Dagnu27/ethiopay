// server/controllers/transactionController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Send money
const sendMoney = async (req, res) => {
  try {
    const { receiverEmail, amount, description } = req.body;
    const senderId = req.user.id;

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0'
      });
    }

    // Find receiver
    const receiver = await prisma.user.findUnique({
      where: { email: receiverEmail }
    });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        error: 'Recipient not found'
      });
    }

    if (receiver.id === senderId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot send money to yourself'
      });
    }

    // Check balance
    const sender = await prisma.user.findUnique({
      where: { id: senderId }
    });

    if (sender.balance < amount) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient balance'
      });
    }

    // Calculate fee (1% with minimum 1 ETB)
    const fee = Math.max(amount * 0.01, 1);

    // Process transaction with Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
      // Deduct from sender (amount + fee)
      const updatedSender = await tx.user.update({
        where: { id: senderId },
        data: { balance: { decrement: amount + fee } }
      });

      // Add to receiver
      const updatedReceiver = await tx.user.update({
        where: { id: receiver.id },
        data: { balance: { increment: amount } }
      });

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          senderId,
          receiverId: receiver.id,
          amount,
          fee,
          type: 'send',
          status: 'completed',
          description: description || 'Money transfer',
          reference: `TX-${Date.now()}-${Math.random().toString(36).substring(7)}`
        }
      });

      // Create notification for sender
      await tx.notification.create({
        data: {
          userId: senderId,
          title: 'Money Sent',
          message: `You sent ${amount} ETB to ${receiver.fullName}`,
          type: 'success'
        }
      });

      // Create notification for receiver
      await tx.notification.create({
        data: {
          userId: receiver.id,
          title: 'Money Received',
          message: `You received ${amount} ETB from ${sender.fullName}`,
          type: 'success'
        }
      });

      return { transaction, updatedSender };
    });

    res.json({
      success: true,
      message: 'Money sent successfully',
      transaction: result.transaction,
      newBalance: result.updatedSender.balance
    });
  } catch (error) {
    console.error('Send money error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send money'
    });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20, offset = 0, type, status } = req.query;

    const where = {
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    };

    if (type) where.type = type;
    if (status) where.status = status;

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        sender: {
          select: { id: true, fullName: true, email: true }
        },
        receiver: {
          select: { id: true, fullName: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset)
    });

    const totalCount = await prisma.transaction.count({ where });

    res.json({
      success: true,
      transactions,
      pagination: {
        total: totalCount,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: Number(offset) + transactions.length < totalCount
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

// Get balance
const getBalance = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        balance: true,
        fullName: true,
        email: true
      }
    });

    res.json({
      success: true,
      balance: user.balance,
      user: {
        name: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch balance'
    });
  }
};

// Get transaction stats
const getTransactionStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalSent = await prisma.transaction.aggregate({
      where: {
        senderId: userId,
        status: 'completed'
      },
      _sum: { amount: true }
    });

    const totalReceived = await prisma.transaction.aggregate({
      where: {
        receiverId: userId,
        status: 'completed'
      },
      _sum: { amount: true }
    });

    const transactionCount = await prisma.transaction.count({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }
    });

    res.json({
      success: true,
      stats: {
        totalSent: totalSent._sum.amount || 0,
        totalReceived: totalReceived._sum.amount || 0,
        totalTransactions: transactionCount
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats'
    });
  }
};

module.exports = {
  sendMoney,
  getTransactionHistory,
  getBalance,
  getTransactionStats
};