// prisma/seeders/permissions.ts

import { modules } from './modules';

export default async function seedPermissions(prisma) {
  console.log('→ Seeding permissions...');

  const permissions = Object.entries(modules).flatMap(([module, config]) =>
    config.actions.map((action) => ({
      name: `${module}.${action}`,
      description: config.actionDescriptions[action],
    })),
  );

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: perm,
    });
  }
}
