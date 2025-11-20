import { PrismaClient } from '@prisma/client';
import { modules } from './modules';

type ModuleConfig = {
  actions: string[];
  description: string;
  actionDescriptions: Record<string, string>;
};

export default async function seedPermissions(prisma: PrismaClient) {
  console.log('→ Seeding permissions...');

  const permissions = Object.entries(modules).flatMap(([moduleName, cfg]) => {
    const config = cfg as ModuleConfig;

    return config.actions.map((action) => ({
      name: `${moduleName}.${action}`,
      description: config.actionDescriptions[action] ?? '',
    }));
  });

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: perm,
    });
  }

  console.log(`✔ Seeded ${permissions.length} permissions`);
}
