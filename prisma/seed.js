const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/helpers');
const { DEFAULT_CATEGORIES } = require('../src/utils/constants');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create demo user
  const hashedPassword = await hashPassword('demo123');
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  console.log('✅ Demo user created:', demoUser.email);

  // Create default categories for demo user
  const categories = [];
  
  // Income categories
  for (const category of DEFAULT_CATEGORIES.INCOME) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        type: 'INCOME',
        color: category.color,
        userId: demoUser.id,
      },
    });
    categories.push(createdCategory);
  }

  // Expense categories
  for (const category of DEFAULT_CATEGORIES.EXPENSE) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        type: 'EXPENSE',
        color: category.color,
        userId: demoUser.id,
      },
    });
    categories.push(createdCategory);
  }

  console.log(`✅ Created ${categories.length} default categories`);

  // Create some sample transactions
  const sampleTransactions = [
    {
      amount: 5000,
      type: 'INCOME',
      note: 'Monthly salary',
      categoryId: categories.find(c => c.name === 'Salary').id,
      userId: demoUser.id,
    },
    {
      amount: 150,
      type: 'EXPENSE',
      note: 'Grocery shopping',
      categoryId: categories.find(c => c.name === 'Food & Dining').id,
      userId: demoUser.id,
    },
    {
      amount: 50,
      type: 'EXPENSE',
      note: 'Gas for car',
      categoryId: categories.find(c => c.name === 'Transportation').id,
      userId: demoUser.id,
    },
    {
      amount: 1200,
      type: 'EXPENSE',
      note: 'Monthly rent',
      categoryId: categories.find(c => c.name === 'Bills & Utilities').id,
      userId: demoUser.id,
    },
    {
      amount: 300,
      type: 'INCOME',
      note: 'Freelance project',
      categoryId: categories.find(c => c.name === 'Freelance').id,
      userId: demoUser.id,
    },
  ];

  for (const transaction of sampleTransactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }

  console.log(`✅ Created ${sampleTransactions.length} sample transactions`);
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
