import { PrismaClient } from '@prisma/client';
import seedBooks from './seed-books';

const main = async () => {
  const prisma = new PrismaClient();

  try {
    await seedBooks(prisma);
  } catch (e) {
    console.error('Seeding failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
