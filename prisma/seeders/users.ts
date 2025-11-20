// prisma/seeders/users.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export default async function seedUsers(prisma: PrismaClient) {
  console.log('→ Seeding users...');

  const superAdminRole = await prisma.role.findUnique({
    where: { name: 'super_admin' },
  });
  const staffRole = await prisma.role.findUnique({ where: { name: 'staff' } });

  if (!superAdminRole || !staffRole) {
    throw new Error(
      'Required roles not found. Please run role seeder before user seeder.',
    );
  }

  const adminPass = await bcrypt.hash(
    process.env.SEED_ADMIN_PASSWORD || 'admin123!',
    12,
  );

  await prisma.user.upsert({
    where: { email: 'admin@filmix.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@filmix.com',
      password: adminPass,
      roleId: superAdminRole.id,
    },
  });

  const staffPass = await bcrypt.hash('staff123!', 12);

  await prisma.user.upsert({
    where: { email: 'staff@filmix.com' },
    update: {},
    create: {
      name: 'Demo Staff',
      email: 'staff@filmix.com',
      password: staffPass,
      roleId: staffRole.id,
    },
  });
}
