import { PrismaClient, Studio, Theater } from '@prisma/client';

export async function seedStudios(theaters: Theater[], prisma: PrismaClient) {
  // common studio types
  const studioTemplates = ['Reguler', 'Deluxe', 'Premier'];

  const created: Studio[] = [];
  for (const theater of theaters) {
    for (const s of studioTemplates) {
      const name = `${s} - ${theater.name.split(' - ')[1] ?? theater.name}`;
      const exist = await prisma.studio.findFirst({
        where: { name, theaterId: theater.id },
      });
      if (exist) {
        created.push(exist);
        continue;
      }

      const studio = await prisma.studio.create({
        data: {
          name,
          theaterId: theater.id,
        },
      });
      created.push(studio);
    }
  }

  console.log('✔ studios seeded');
  await prisma.$disconnect();
  return created;
}
