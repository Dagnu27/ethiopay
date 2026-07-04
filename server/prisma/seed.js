// server/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🌱 Seeding database...');

  // Hash passwords
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const userPassword = await bcrypt.hash('User@123', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ethiopay.com' },
    update: {},
    create: {
      fullName: 'Admin User',
      email: 'admin@ethiopay.com',
      phone: '+251911111111',
      passwordHash: adminPassword,
      balance: 10000,
      isAdmin: true,
      isActive: true,
      profileImage: 'https://ui-avatars.com/api/?name=Admin+User&background=1a73e8&color=fff'
    }
  });

  // Create regular users
  const user1 = await prisma.user.upsert({
    where: { email: 'user@ethiopay.com' },
    update: {},
    create: {
      fullName: 'Test User',
      email: 'user@ethiopay.com',
      phone: '+251922222222',
      passwordHash: userPassword,
      balance: 5000,
      isAdmin: false,
      isActive: true,
      profileImage: 'https://ui-avatars.com/api/?name=Test+User&background=34a853&color=fff'
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'merchant@ethiopay.com' },
    update: {},
    create: {
      fullName: 'Merchant User',
      email: 'merchant@ethiopay.com',
      phone: '+251933333333',
      passwordHash: userPassword,
      balance: 20000,
      isAdmin: false,
      isActive: true,
      profileImage: 'https://ui-avatars.com/api/?name=Merchant+User&background=ea4335&color=fff'
    }
  });

  // Create sample transactions
  const transactions = await prisma.transaction.createMany({
    data: [
      {
        senderId: admin.id,
        receiverId: user1.id,
        amount: 1000,
        type: 'send',
        status: 'completed',
        description: 'Welcome bonus',
        reference: `TX-${Date.now()}-001`
      },
      {
        senderId: user1.id,
        receiverId: admin.id,
        amount: 500,
        type: 'send',
        status: 'completed',
        description: 'Payment for services',
        reference: `TX-${Date.now()}-002`
      },
      {
        senderId: user1.id,
        receiverId: user2.id,
        amount: 250,
        type: 'send',
        status: 'pending',
        description: 'Pending transaction',
        reference: `TX-${Date.now()}-003`
      },
      {
        senderId: admin.id,
        receiverId: user2.id,
        amount: 2000,
        type: 'send',
        status: 'completed',
        description: 'Investment',
        reference: `TX-${Date.now()}-004`
      }
    ]
  });

  // Create sample bills
  const bills = await prisma.bill.createMany({
    data: [
      {
        userId: user1.id,
        provider: 'Ethio Telecom',
        accountNumber: '911-123456-1',
        amount: 350,
        status: 'pending',
        dueDate: new Date('2026-07-15')
      },
      {
        userId: user1.id,
        provider: 'EEU (Electricity)',
        accountNumber: 'E-789-456-123',
        amount: 1200,
        status: 'paid',
        dueDate: new Date('2026-06-30'),
        paidAt: new Date('2026-06-28')
      },
      {
        userId: user2.id,
        provider: 'Water Authority',
        accountNumber: 'WA-456-789-012',
        amount: 450,
        status: 'pending',
        dueDate: new Date('2026-07-20')
      }
    ]
  });

  // Create sample withdrawals
  const withdrawals = await prisma.withdrawal.createMany({
    data: [
      {
        userId: user1.id,
        amount: 1000,
        status: 'completed',
        method: 'bank',
        accountInfo: 'Bank of Abyssinia - 123456789',
        reference: `WD-${Date.now()}-001`,
        processedAt: new Date()
      },
      {
        userId: user2.id,
        amount: 2000,
        status: 'pending',
        method: 'mobile',
        accountInfo: 'M-Pesa - 251922222222',
        reference: `WD-${Date.now()}-002`
      }
    ]
  });

  // Create sample notifications
  const notifications = await prisma.notification.createMany({
    data: [
      {
        userId: user1.id,
        title: 'Welcome to EthioPay',
        message: 'Thank you for joining EthioPay! Start sending money today.',
        type: 'success',
        isRead: false
      },
      {
        userId: user1.id,
        title: 'Transaction Complete',
        message: 'You have received 1000.00 ETB from Admin User.',
        type: 'success',
        isRead: false
      },
      {
        userId: user2.id,
        title: 'Payment Reminder',
        message: 'Your bill for Water Authority is due on 2026-07-20.',
        type: 'warning',
        isRead: false
      }
    ]
  });

  console.log('✅ Seed data created successfully!');
  console.log('');
  console.log('📊 Users created:');
  console.log(`  - Admin: admin@ethiopay.com (Password: Admin@123)`);
  console.log(`  - User: user@ethiopay.com (Password: User@123)`);
  console.log(`  - Merchant: merchant@ethiopay.com (Password: User@123)`);
  console.log('');
  console.log('📈 Stats:');
  console.log(`  - ${await prisma.user.count()} users`);
  console.log(`  - ${await prisma.transaction.count()} transactions`);
  console.log(`  - ${await prisma.bill.count()} bills`);
  console.log(`  - ${await prisma.withdrawal.count()} withdrawals`);
  console.log(`  - ${await prisma.notification.count()} notifications`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });