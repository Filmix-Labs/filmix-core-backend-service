import { PrismaClient } from '@prisma/client';

export async function seedMovieRating(prisma: PrismaClient) {
  const ratings = ['G', 'PG', 'PG-13', 'R'];

  for (const r of ratings) {
    await prisma.movieRating.upsert({
      where: { rating: r },
      update: {},
      create: { rating: r },
    });
  }

  console.log('✔ movieRating seeded');
  await prisma.$disconnect();
}
