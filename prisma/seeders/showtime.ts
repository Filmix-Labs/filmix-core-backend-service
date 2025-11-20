import { Movie, PrismaClient, Studio, Theater } from '@prisma/client';

export async function seedShowtimes(
  movies: Movie[],
  studios: Studio[],
  theaters: Theater[],
  prisma: PrismaClient,
) {
  // We'll create several daily showtimes per movie per studio (limited sample)
  const times = ['10:30', '13:30', '16:00', '19:00', '21:30']; // local schedule strings
  const today = new Date();
  // ensure times are in the future for demonstration (use today's date with local time)
  function parseTimeToDate(timeStr: string, daysFromNow = 0) {
    const [hh, mm] = timeStr.split(':').map(Number);
    const d = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + daysFromNow,
        hh,
        mm,
      ),
    ); // UTC to avoid TZ issues in seed
    return d;
  }

  for (const movie of movies) {
    // pick 2 studios randomly for each movie
    const chosenStudios = studios.slice(0, Math.min(2, studios.length));
    for (const studio of chosenStudios) {
      for (const t of times) {
        const showtimeDate = parseTimeToDate(t, 1); // tomorrow
        const exists = await prisma.showtime.findFirst({
          where: { movieId: movie.id, studioId: studio.id, time: showtimeDate },
        });
        if (!exists) {
          await prisma.showtime.create({
            data: {
              movieId: movie.id,
              studioId: studio.id,
              theaterId: theaters[0].id,
              time: showtimeDate,
              expiredAt: new Date(showtimeDate.getTime() + 1000 * 60 * 60 * 2), // +2hrs
              status: true,
            },
          });
        }
      }
    }
  }

  console.log('✔ showtimes seeded');
  await prisma.$disconnect();
}
