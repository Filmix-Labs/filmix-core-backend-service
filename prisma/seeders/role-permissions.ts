// prisma/seeders/rolePermissions.ts

export default async function seedRolePermissions(prisma) {
  console.log('→ Seeding role permissions...');

  const roles = await prisma.role.findMany();
  const permissions = await prisma.permission.findMany();

  const permNames = permissions.map((p) => p.name);

  const expand = (pattern) => {
    if (pattern === '*') return permNames;
    if (pattern.endsWith('.*'))
      return permNames.filter((p) => p.startsWith(pattern.replace('.*', '.')));
    return [pattern];
  };

  const roleToPermPatterns = {
    super_admin: ['*'],

    cinema_manager: [
      'movies.*',
      'genres.*',
      'theaters.*',
      'studios.*',
      'seats.*',
      'seatTypes.*',
      'seatPricings.*',
      'seatPricingOverrides.*',
      'showtimes.*',
      'transactions.view',
      'transactions.manage',
      'reports.*',
    ],

    staff: [
      'movies.*',
      'genres.*',
      'theaters.*',
      'studios.*',
      'seats.*',
      'seatTypes.*',
      'seatPricings.*',
      'seatPricingOverrides.*',
      'showtimes.*',
      'transactions.view',
      'transactions.manage',
      'reports.view',
    ],

    user: ['movies.view', 'showtimes.view', 'transactions.view'],
  };

  for (const [roleName, patterns] of Object.entries(roleToPermPatterns)) {
    const role = roles.find((r) => r.name === roleName);
    if (!role) continue;

    const resolved = new Set(patterns.flatMap(expand));

    for (const permName of resolved) {
      const perm = permissions.find((p) => p.name === permName);
      if (!perm) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: perm.id,
        },
      });
    }
  }
}
