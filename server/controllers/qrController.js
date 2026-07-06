// server/controllers/qrController.js
const QRCode = require('qrcode');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate QR code for payment
const generateQR = async (req, res) => {
  try {
    const { amount, description, receiverEmail } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0'
      });
    }

    // Find receiver
    let receiverId = null;
    if (receiverEmail) {
      const receiver = await prisma.user.findUnique({
        where: { email: receiverEmail }
      });
      if (!receiver) {
        return res.status(404).json({
          success: false,
          error: 'Receiver not found'
        });
      }
      receiverId = receiver.id;
    }

    // Create QR data payload
    const qrData = {
      merchantId: userId,
      receiverId: receiverId || userId,
      amount: amount,
      description: description || 'Payment',
      timestamp: Date.now(),
      expiresAt: Date.now() + 300000 // 5 minutes expiry
    };

    // Generate QR code as base64 image
    const qrString = JSON.stringify(qrData);
    const qrCode = await QRCode.toDataURL(qrString);

    // Save QR code record
    const qrRecord = await prisma.qRCode.create({
      data: {
        userId,
        amount,
        description: description || 'Payment',
        qrData: qrString,
        expiresAt: new Date(Date.now() + 300000),
        status: 'active'
      }
    });

    res.json({
      success: true,
      message: 'QR code generated successfully',
      qrCode,
      qrId: qrRecord.id,
      expiresAt: qrRecord.expiresAt,
      amount,
      description: description || 'Payment'
    });
  } catch (error) {
    console.error('QR generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate QR code'
    });
  }
};

// Scan QR code and process payment
const scanQR = async (req, res) => {
  try {
    const { qrData } = req.body;
    const userId = req.user.id;

    if (!qrData) {
      return res.status(400).json({
        success: false,
        error: 'QR data is required'
      });
    }

    // Parse QR data
    let paymentInfo;
    try {
      paymentInfo = JSON.parse(qrData);
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: 'Invalid QR code data'
      });
    }

    // Check if QR code is expired
    if (paymentInfo.expiresAt && paymentInfo.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        error: 'QR code has expired'
      });
    }

    // Check if sender is trying to pay themselves
    if (paymentInfo.merchantId === userId) {
      return res.status(400).json({
        success: false,
        error: 'You cannot pay yourself'
      });
    }

    // Process payment using existing transaction logic
    const sender = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!sender) {
      return res.status(404).json({
        success: false,
        error: 'Sender not found'
      });
    }

    const fee = Math.max(paymentInfo.amount * 0.01, 1);
    const totalCost = paymentInfo.amount + fee;

    if (sender.balance < totalCost) {
      return res.status(400).json({
        success: false,
        error: `Insufficient balance. Need ${totalCost} ETB (including ${fee} ETB fee)`
      });
    }

    // Process transaction
    const result = await prisma.$transaction(async (tx) => {
      // Deduct from sender
      const updatedSender = await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

      // Add to merchant
      const updatedMerchant = await tx.user.update({
        where: { id: paymentInfo.merchantId },
        data: { balance: { increment: paymentInfo.amount } }
      });

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          senderId: userId,
          receiverId: paymentInfo.merchantId,
          amount: paymentInfo.amount,
          fee,
          type: 'qr_payment',
          status: 'completed',
          description: `QR Payment: ${paymentInfo.description || 'Payment'}`,
          reference: `QR-${Date.now()}-${Math.random().toString(36).substring(7)}`
        }
      });

      // Create notifications
      await tx.notification.createMany({
        data: [
          {
            userId,
            title: 'QR Payment Sent',
            message: `You sent ${paymentInfo.amount} ETB via QR code. Fee: ${fee} ETB`,
            type: 'success'
          },
          {
            userId: paymentInfo.merchantId,
            title: 'QR Payment Received',
            message: `You received ${paymentInfo.amount} ETB via QR code from ${sender.fullName}`,
            type: 'success'
          }
        ]
      });

      return { transaction, updatedSender };
    });

    res.json({
      success: true,
      message: 'QR payment processed successfully',
      transaction: result.transaction,
      newBalance: result.updatedSender.balance
    });
  } catch (error) {
    console.error('QR scan error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process QR payment'
    });
  }  
};

module.exports = { generateQR, scanQR };