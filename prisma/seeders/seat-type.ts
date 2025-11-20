import { Cinema, PrismaClient, SeatType } from '@prisma/client';

export async function seedSeatTypes(cinemas: Cinema[], prisma: PrismaClient) {
  // common seat types for cinemas in Indonesia
  const seatTypeNames = ['Regular', 'VIP', 'SweetBox'];

  const created: SeatType[] = [];
  for (const cinema of cinemas) {
    for (const name of seatTypeNames) {
      // composite unique: @@unique([name, cinemaId]) -> where uses name_cinemaId
      const st = await prisma.seatType.upsert({
        where: { name_cinemaId: { name, cinemaId: cinema.id } },
        update: {},
        create: {
          name,
          cinemaId: cinema.id,
        },
      });
      created.push(st);
    }
  }

  console.log('✔ seatTypes seeded');
  await prisma.$disconnect();
  return created;
}
