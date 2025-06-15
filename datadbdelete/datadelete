import { prisma } from '../lib/db';


async function clearDatabase() {
  await prisma.employee.deleteMany();
 
  
  console.log('✅ All data deleted.');
  process.exit(0);
}

clearDatabase().catch((err) => {
  console.error('❌ Error clearing DB:', err);
  process.exit(1);
});