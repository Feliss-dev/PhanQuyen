
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';  // You can use bcrypt or bcryptjs to hash the password

const prisma = new PrismaClient();

async function main() {
  // Seed a user
  // const passwordHash = await bcrypt.hash('password123', 10);  // Hash the password

  // const admin = await prisma.user.create({
  //   data: {
  //     name: 'Admin',
  //     email: 'admin@gmail.com',
  //     password: passwordHash,  // Store the hashed password
  //     role: UserRole.ADMIN,     // Set the role as ADMIN
  //   },
  // });

  // const user = await prisma.user.create({
  //   data: {
  //     name: 'UserUser',
  //     email: 'user@gmail.com',
  //     password: passwordHash,  // Store the hashed password
  //     role: UserRole.USER,     // Set the role as ADMIN
  //   },
  // });

  // console.log('User created:', admin ,user);

  const permissions = [
    { name: "READ" },
    { name: "WRITE" },
    { name: "DELETE" },
    { name: "ADMIN" },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }

  console.log("Permissions seeded successfully!");

 
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
