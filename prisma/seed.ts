
import { DocumentStatus, PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';  // You can use bcrypt or bcryptjs to hash the password

const prisma = new PrismaClient();

async function main() {
  // Seed departments (Don vi)
  const departments = await prisma.departments.createMany({
    data: [
      {name: 'Khoa Môi Trường'},
      {name: 'Khoa Địa Chất'},
      {name: 'Khoa Tài Nguyên Nước'},
      {name: 'Phòng Đào Tạo'},
      {name: 'Phòng Kế Hoạch Tài Chính'},
    ],
  });

  console.log('Departments created:', departments);


   // Create Permissions
   const permissions = [
    { name: 'VIEW_DOCUMENTS' },
    { name: 'EDIT_DOCUMENTS' },
    { name: 'MANAGE_USERS' },
  ];
  
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {}, // Do nothing if it exists
      create: permission, // Create if it doesn't exist
    });
  }
  
  console.log('Permissions seeded successfully!');


  // Seed a user
  const passwordHash = await bcrypt.hash('password123', 10);  // Hash the password

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: passwordHash,  // Store the hashed password
      role: UserRole.ADMIN,     // Set the role as ADMIN
      departmentId: (await prisma.departments.findFirst({where: {name: 'Phòng Đào Tạo'}}))!.id, // ! chan chan du lieu khong phai null hoac undefined
      // Set department
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'User',
      email: 'user@gmail.com',
      password: passwordHash,  // Store the hashed password
      role: UserRole.USER,     // Set the role as User
      departmentId: (await prisma.departments.findFirst({where: {name: 'Khoa Môi Trường'}}))!.id, // ! chan chan du lieu khong phai null hoac undefined
    },
  });

  console.log('User created:', admin ,user);

  const adminUser = await prisma.user.findFirst({where: {email: 'admin@gmail.com'}});
  const permissionsList = await prisma.permission.findMany();

  for (const permission of permissionsList) {
    await prisma.userPermission.create({
      data: {
        userId: adminUser!.id,
        permissionId: permission.id,
      }
    })
  }

  //Create Fields
  const fields = await prisma.fields.createMany({
    data: [
      {name: 'Quản lý môi trường'},
      {name: 'Quản lý địa chất'},
      {name: 'Quản lý tài nguyên nước'},
    ],
  });

  console.log('Fields created:', fields);

  const documentTypes = await prisma.documentTypes.createMany({
    data: [
      {name: 'Báo cáo'},
      {name: 'Biên bản'},
      {name: 'Quyết định'},
    ],
  });
  console.log('Document Types created:', documentTypes);


  console.log('Seeding completed.');

  // const permissions = [
  //   { name: "READ" },
  //   { name: "WRITE" },
  //   { name: "DELETE" },
  //   { name: "ADMIN" },
  // ];

  // for (const permission of permissions) {
  //   await prisma.permission.upsert({
  //     where: { name: permission.name },
  //     update: {},
  //     create: permission,
  //   });
  // }

  // console.log("Permissions seeded successfully!");

 
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
