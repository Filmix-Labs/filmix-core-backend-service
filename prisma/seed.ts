import { PrismaClient } from '@prisma/client';

import seedPermissions from './seeders/permissions';
import seedRoles from './seeders/roles';
import seedRolePermissions from './seeders/role-permissions';
import seedUsers from './seeders/users';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Filmix RBAC Seeder...');
  await seedPermissions(prisma);
  await seedRoles(prisma);
  await seedRolePermissions(prisma);
  await seedUsers(prisma);
  console.log('🌱 RBAC Seeding Completed Successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
