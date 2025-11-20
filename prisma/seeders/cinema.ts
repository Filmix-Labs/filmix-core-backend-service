import { Cinema, PrismaClient } from '@prisma/client';

export async function seedCinemas(prisma: PrismaClient) {
  const cinemasData = [
    { name: 'XXI', logoUrl: 'https://example.com/logos/xxi.png' },
    { name: 'CGV', logoUrl: 'https://example.com/logos/cgv.png' },
    { name: 'Cinepolis', logoUrl: 'https://example.com/logos/cinepolis.png' },
    { name: 'Flix Cinema', logoUrl: 'https://example.com/logos/flix.png' },
  ];

  const created: Cinema[] = [];
  for (const c of cinemasData) {
    const exist = await prisma.cinema.findFirst({
      where: { name: c.name },
    });

    if (exist) {
      created.push(exist);
      continue;
    }

    const item = await prisma.cinema.create({
      data: {
        name: c.name,
        logoUrl: c.logoUrl,
      },
    });
    created.push(item);
  }

  console.log('✔ cinemas seeded');
  await prisma.$disconnect();
  return created;
}
