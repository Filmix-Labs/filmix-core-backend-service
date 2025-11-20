import { Movie, PrismaClient } from '@prisma/client';

export async function seedMovies(prisma: PrismaClient) {
  // sample real/near-real titles (mix of animated, blockbuster, horror, local)
  const moviesData = [
    {
      title: 'Inside Out 2',
      duration: 120,
      popularity: 95,
      tagline: 'Feelings get bigger',
      overview: 'Sequel to Inside Out.',
    },
    {
      title: 'Deadpool & Wolverine',
      duration: 125,
      popularity: 98,
      tagline: 'Chaos returns',
      overview: 'Deadly humorous action.',
    },
    { title: 'The Marvels', duration: 115, popularity: 85 },
    { title: 'Wonka', duration: 110, popularity: 80 },
    { title: 'The Conjuring: Last Rites', duration: 105, popularity: 70 },
    { title: 'Moana 2', duration: 107, popularity: 88 },
    { title: 'Kung Fu Panda 4', duration: 100, popularity: 82 },
    // add local-sounding films
    { title: 'Senja di Jakarta', duration: 110, popularity: 60 },
    { title: 'Malam Terakhir', duration: 95, popularity: 50 },
    { title: 'Neon Horizon', duration: 118, popularity: 65 },
  ];

  // get references
  const statusNow = await prisma.movieStatus.findFirst({
    where: { status: 'Now Showing' },
  });
  const statusComing = await prisma.movieStatus.findFirst({
    where: { status: 'Coming Soon' },
  });
  const ratingPG13 = await prisma.movieRating.findFirst({
    where: { rating: 'PG-13' },
  });
  const ratingR = await prisma.movieRating.findFirst({
    where: { rating: 'R' },
  });
  const genres = await prisma.movieGenre.findMany();

  const created: Movie[] = [];
  for (const m of moviesData) {
    const exist = await prisma.movie.findFirst({ where: { title: m.title } });
    if (exist) {
      created.push(exist);
      continue;
    }

    const movie = await prisma.movie.create({
      data: {
        title: m.title,
        tagline: m.tagline ?? null,
        overview: m.overview ?? null,
        duration: m.duration,
        popularity: m.popularity,
        posterUrl: `https://example.com/posters/${encodeURIComponent(m.title)}.jpg`,
        backdropUrl: null,
        trailerUrl: null,
        movieStatusId:
          m.popularity && m.popularity > 75 ? statusNow!.id : statusComing!.id,
        movieRatingId:
          m.title.includes('Conjuring') || m.title.includes('Deadpool')
            ? ratingR!.id
            : ratingPG13!.id,
        genreMovie: {
          create: [
            {
              movieGenreId:
                genres[Math.floor(Math.random() * genres.length)].id,
            },
            {
              movieGenreId:
                genres[Math.floor(Math.random() * genres.length)].id,
            },
          ],
        },
      },
    });
    created.push(movie);
  }

  console.log('✔ movies seeded');
  await prisma.$disconnect();
  return created;
}
