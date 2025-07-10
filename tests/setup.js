// Test setup file
const { prisma } = require('../src/config/database');

// Clean up database after each test
afterEach(async () => {
  const deleteTransactions = prisma.transaction.deleteMany();
  const deleteCategories = prisma.category.deleteMany();
  const deleteUsers = prisma.user.deleteMany();
  
  await prisma.$transaction([
    deleteTransactions,
    deleteCategories,
    deleteUsers,
  ]);
});

// Close database connection after all tests
afterAll(async () => {
  await prisma.$disconnect();
});
