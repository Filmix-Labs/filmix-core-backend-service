import { PrismaClient } from '@prisma/client';

import seedPermissions from './seeders/permissions';
import seedRoles from './seeders/roles';
import seedRolePermissions from './seeders/role-permissions';
import seedUsers from './seeders/users';
import { seedMovieStatus } from './seeders/movie-status';
import { seedMovieRating } from './seeders/movie-rating';
import { seedMovieGenre } from './seeders/movie-genre';
import { seedMovies } from './seeders/movie';
import { seedPaymentMethods } from './seeders/payment-method';
import { seedShowtimes } from './seeders/showtime';
import { seedCinemas } from './seeders/cinema';
import { seedTheaters } from './seeders/theater';
import { seedStudios } from './seeders/studio';
import { seedSeatTypes } from './seeders/seat-type';
import { seedSeats } from './seeders/seat';
import { seedSeatPricing } from './seeders/seat-pricing';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Filmix Seeder...');
  await seedPermissions(prisma);
  await seedRoles(prisma);
  await seedRolePermissions(prisma);
  await seedUsers(prisma);

  await seedMovieStatus(prisma);
  await seedMovieRating(prisma);
  await seedMovieGenre(prisma);

  // Cinemas -> Theaters -> Studios
  const cinemas = await seedCinemas(prisma);
  const theaters = await seedTheaters(cinemas, prisma);
  const studios = await seedStudios(theaters, prisma);

  // Seat types (per cinema)
  const seatTypes = await seedSeatTypes(cinemas, prisma);
  await seedSeats(studios, seatTypes, prisma);
  await seedSeatPricing(theaters, seatTypes, prisma);

  // Payment methods
  await seedPaymentMethods(prisma);

  // Movies
  const movies = await seedMovies(prisma);

  // Showtimes
  await seedShowtimes(movies, studios, theaters, prisma);

  console.log('🌱 Seeding Completed Successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
