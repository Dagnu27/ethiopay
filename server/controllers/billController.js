// server/controllers/billController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user's bills
const getMyBills = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const where = { userId };
    if (status) where.status = status;

    const bills = await prisma.bill.findMany({
      where,
      orderBy: { dueDate: 'asc' }
    });

    res.json({
      success: true,
      count: bills.length,
      bills
    });
  } catch (error) {
    console.error('Get bills error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bills'
    });
  }
};

// Pay a bill
const payBill = async (req, res) => {
  try {
    const { billId } = req.params;
    const userId = req.user.id;

    console.log('📝 Paying bill:', { billId, userId });

    // Get the bill
    const bill = await prisma.bill.findUnique({
      where: { id: billId }
    });

    if (!bill) {
      console.log('❌ Bill not found:', billId);
      return res.status(404).json({
        success: false,
        error: 'Bill not found'
      });
    }

    console.log('📄 Bill found:', bill);

    if (bill.status === 'paid') {
      console.log('❌ Bill already paid');
      return res.status(400).json({
        success: false,
        error: 'Bill already paid'
      });
    }

    if (bill.userId !== userId) {
      console.log('❌ Unauthorized: User', userId, 'trying to pay bill for', bill.userId);
      return res.status(403).json({
        success: false,
        error: 'You can only pay your own bills'
      });
    }

    // Check balance
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      console.log('❌ User not found:', userId);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    console.log('💰 User balance:', user.balance);

    const fee = Math.max(bill.amount * 0.01, 1);
    const totalCost = bill.amount + fee;

    console.log('💳 Total cost:', { amount: bill.amount, fee, totalCost });

    if (user.balance < totalCost) {
      console.log('❌ Insufficient balance:', user.balance, '<', totalCost);
      return res.status(400).json({
        success: false,
        error: `Insufficient balance. Need ${totalCost} ETB (including ${fee} ETB fee)`
      });
    }

    // Process payment
    console.log('🔄 Processing payment...');
    const result = await prisma.$transaction(async (tx) => {
      // Deduct from user
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

      console.log('✅ User updated. New balance:', updatedUser.balance);

      // Update bill status
      const updatedBill = await tx.bill.update({
        where: { id: billId },
        data: {
          status: 'paid',
          paidAt: new Date()
        }
      });

      console.log('✅ Bill updated. Status:', updatedBill.status);

      // Create notification
      await tx.notification.create({
        data: {
          userId,
          title: 'Bill Paid',
          message: `You paid ${bill.amount} ETB for ${bill.provider} (${bill.accountNumber})`,
          type: 'success'
        }
      });

      console.log('✅ Notification created');

      return { updatedUser, updatedBill };
    });

    console.log('✅ Payment successful!');
    res.json({
      success: true,
      message: 'Bill paid successfully',
      newBalance: result.updatedUser.balance,
      bill: result.updatedBill
    });
  } catch (error) {
    console.error('❌ Pay bill error DETAILS:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Failed to pay bill',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { getMyBills, payBill };