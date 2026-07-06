// server/services/emailService.js
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email function
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"EthioPay" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// Transaction notification
const sendTransactionEmail = async (user, transaction, type) => {
  const subject = type === 'sent' ? '💸 Money Sent' : '💰 Money Received';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a73e8;">EthioPay</h1>
      <h2>${subject}</h2>
      <p>Dear ${user.fullName},</p>
      <p>${type === 'sent' ? 'You have sent' : 'You have received'} <strong>${transaction.amount} ETB</strong>.</p>
      ${type === 'sent' ? `<p>Fee: ${transaction.fee} ETB</p>` : ''}
      <p>Transaction Reference: <strong>${transaction.reference}</strong></p>
      <p>Description: ${transaction.description || 'N/A'}</p>
      <p>Date: ${new Date(transaction.createdAt).toLocaleString()}</p>
      <p>Your new balance: <strong>${transaction.newBalance} ETB</strong></p>
      <hr>
      <p style="color: #666; font-size: 12px;">This is an automated message from EthioPay.</p>
    </div>
  `;

  return await sendEmail(user.email, subject, html);
};

// Bill payment notification
const sendBillPaymentEmail = async (user, bill) => {
  const subject = '📄 Bill Paid Successfully';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a73e8;">EthioPay</h1>
      <h2>${subject}</h2>
      <p>Dear ${user.fullName},</p>
      <p>Your bill has been paid successfully.</p>
      <p>Provider: <strong>${bill.provider}</strong></p>
      <p>Account: <strong>${bill.accountNumber}</strong></p>
      <p>Amount: <strong>${bill.amount} ETB</strong></p>
      <p>Date: ${new Date().toLocaleString()}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">This is an automated message from EthioPay.</p>
    </div>
  `;

  return await sendEmail(user.email, subject, html);
};

// Withdrawal notification
const sendWithdrawalEmail = async (user, withdrawal) => {
  const subject = withdrawal.status === 'completed' ? '✅ Withdrawal Approved' : '⏳ Withdrawal Requested';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a73e8;">EthioPay</h1>
      <h2>${subject}</h2>
      <p>Dear ${user.fullName},</p>
      <p>${withdrawal.status === 'completed' ? 'Your withdrawal has been approved and processed.' : 'Your withdrawal request has been submitted.'}</p>
      <p>Amount: <strong>${withdrawal.amount} ETB</strong></p>
      <p>Method: <strong>${withdrawal.method}</strong></p>
      <p>Reference: <strong>${withdrawal.reference}</strong></p>
      <p>Status: <strong style="color: ${withdrawal.status === 'completed' ? 'green' : 'orange'};">${withdrawal.status.toUpperCase()}</strong></p>
      <hr>
      <p style="color: #666; font-size: 12px;">This is an automated message from EthioPay.</p>
    </div>
  `;

  return await sendEmail(user.email, subject, html);
};

module.exports = {
  sendEmail,
  sendTransactionEmail,
  sendBillPaymentEmail,
  sendWithdrawalEmail
};