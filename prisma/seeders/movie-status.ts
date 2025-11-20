import { PrismaClient } from '@prisma/client';

export async function seedMovieStatus(prisma: PrismaClient) {
  const statuses = ['Coming Soon', 'Now Showing', 'Ended'];

  for (const s of statuses) {
    await prisma.movieStatus.upsert({
      where: { status: s },
      update: {},
      create: { status: s },
    });
  }

  console.log('✔ movieStatus seeded');
  await prisma.$disconnect();
}
