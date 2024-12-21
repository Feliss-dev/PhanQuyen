import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';  // You can use bcrypt or bcryptjs to hash the password

const prisma = new PrismaClient();

async function main() {
  // Seed a user
  const passwordHash = await bcrypt.hash('password123', 10);  // Hash the password

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@gmailgmail.com',
      password: passwordHash,  // Store the hashed password
      role: UserRole.ADMIN,     // Set the role as ADMIN
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'UserUser',
      email: 'user@gmail.com',
      password: passwordHash,  // Store the hashed password
      role: UserRole.ADMIN,     // Set the role as ADMIN
    },
  });

  console.log('User created:', admin ,user);

 
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
