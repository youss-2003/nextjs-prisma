import { prisma } from '@/lib/db';



async function main() {
  await prisma.employee.createMany({
    data: [
      {
        firstName: 'Youssef',
        lastName: 'Ratbi',
        email: 'youssef.ratbi@example.com',
        idCardNumber: 'AA123456',
        position: 'Senior Developer',
        salary: 85000,
      },
      {
        firstName: 'Nadja',
        lastName: 'Vampire',
        email: 'nadja@example.com',
        idCardNumber: 'BB789012',
        position: 'HR Manager',
        salary: 65000,
      },
      {
        firstName: 'Colin',
        lastName: 'Robinson',
        email: 'colin@example.com',
        idCardNumber: 'CC345678',
        position: 'Energy Vampire',
        salary: 0,
      },
    ],
  });

  console.log('🌱 Employees seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });