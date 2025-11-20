import { PrismaClient } from '@prisma/client';

export async function seedMovieGenre(prisma: PrismaClient) {
  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Horror',
    'Thriller',
    'Animation',
    'Family',
    'Fantasy',
    'Sci-Fi',
    'Romance',
  ];

  for (const g of genres) {
    await prisma.movieGenre.upsert({
      where: { genre: g },
      update: {},
      create: { genre: g },
    });
  }

  console.log('✔ movieGenre seeded');
  await prisma.$disconnect();
}
