import { prisma } from '@/lib/db';

async function main() {
  await prisma.employee.createMany({
    data: [
      {
        firstName: 'Youssef',
        lastName: 'Ratbi',
        email: 'youssef.ratbi@example.com',
        phoneNumber: '+212600112233',
        idCardNumber: 'AA123456',
        position: 'Senior Developer',
        department: 'Engineering',
        salary: 85000,
        status: 'active',
        photoUrl: 'https://i.pravatar.cc/150?img=1',
        notes: 'Team lead with 5 years of experience.'
      },
      {
        firstName: 'Nadja',
        lastName: 'Vampire',
        email: 'nadja@example.com',
        phoneNumber: '+212611223344',
        idCardNumber: 'BB789012',
        position: 'HR Manager',
        department: 'Human Resources',
        salary: 65000,
        status: 'active',
        photoUrl: 'https://i.pravatar.cc/150?img=2',
        notes: 'Very persuasive and experienced in conflict resolution.'
      },
      {
        firstName: 'Colin',
        lastName: 'Robinson',
        email: 'colin@example.com',
        phoneNumber: '+212622334455',
        idCardNumber: 'CC345678',
        position: 'Energy Vampire',
        department: 'Support',
        salary: 0,
        status: 'inactive',
        photoUrl: 'https://i.pravatar.cc/150?img=3',
        notes: 'Drains energy during meetings.'
      },
      {
        firstName: 'Laszlo',
        lastName: 'Cravensworth',
        email: 'laszlo@example.com',
        phoneNumber: '+212633445566',
        idCardNumber: 'DD901234',
        position: 'Finance Analyst',
        department: 'Finance',
        salary: 72000,
        status: 'active',
        photoUrl: 'https://i.pravatar.cc/150?img=4'
      },
      {
        firstName: 'Guillermo',
        lastName: 'de la Cruz',
        email: 'guillermo@example.com',
        phoneNumber: '+212644556677',
        idCardNumber: 'EE567890',
        position: 'Assistant',
        department: 'Executive',
        salary: 48000,
        status: 'terminated',
        photoUrl: 'https://i.pravatar.cc/150?img=5'
      },
      {
        firstName: 'Jenna',
        lastName: 'Snyder',
        email: 'jenna.snyder@example.com',
        phoneNumber: '+212655667788',
        idCardNumber: 'FF234567',
        position: 'Marketing Specialist',
        department: 'Marketing',
        salary: 58000,
        status: 'active'
      },
      {
        firstName: 'Derek',
        lastName: 'Stone',
        email: 'derek.stone@example.com',
        phoneNumber: '+212666778899',
        idCardNumber: 'GG345678',
        position: 'Product Manager',
        department: 'Product',
        salary: 90000,
        status: 'active'
      },
      {
        firstName: 'Vanessa',
        lastName: 'Moon',
        email: 'vanessa.moon@example.com',
        phoneNumber: '+212677889900',
        idCardNumber: 'HH456789',
        position: 'UX Designer',
        department: 'Design',
        salary: 69000,
        status: 'active'
      },
      {
        firstName: 'Arjun',
        lastName: 'Rao',
        email: 'arjun.rao@example.com',
        phoneNumber: '+212688990011',
        idCardNumber: 'II567890',
        position: 'DevOps Engineer',
        department: 'Engineering',
        salary: 78000,
        status: 'active'
      },
      {
        firstName: 'Fatima',
        lastName: 'Zahra',
        email: 'fatima.zahra@example.com',
        phoneNumber: '+212699001122',
        idCardNumber: 'JJ678901',
        position: 'QA Engineer',
        department: 'Engineering',
        salary: 61000,
        status: 'active'
      }
    ],
  });

  console.log('201 :)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
