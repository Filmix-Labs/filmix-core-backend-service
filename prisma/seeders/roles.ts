// prisma/seeders/roles.ts

const roles = [
  { name: 'super_admin' },
  { name: 'cinema_manager' },
  { name: 'staff' },
  { name: 'user' },
];

export default async function seedRoles(prisma) {
  console.log('→ Seeding roles...');

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }
}
