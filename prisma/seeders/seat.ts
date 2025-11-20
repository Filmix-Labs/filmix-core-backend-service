import { PrismaClient } from '@prisma/client';

export async function seedSeats(
  studios: { id: string }[],
  seatTypes: { id: string; name: string; cinemaId: string }[],
  prisma: PrismaClient,
) {
  // Create rows A-H and numbers 1-12 for each studio
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  // Use Regular seatType by default for most seats, VIP/SweetBox will be placed in last few rows
  for (const studio of studios) {
    // find a seat type that belongs to studio's theater's cinema — but we don't have cinemaId here.
    // We'll pick any "Regular" seatType as fallback.
    const regular = seatTypes.find((st) => st.name === 'Regular')!;
    const vip = seatTypes.find((st) => st.name === 'VIP')!;
    const sweet = seatTypes.find((st) => st.name === 'SweetBox')!;

    for (const row of rows) {
      for (const number of numbers) {
        // pick seatType by row (e.g., last two rows are VIP / SweetBox)
        let seatTypeId = regular.id;
        if (row === 'G') seatTypeId = vip.id;
        if (row === 'H') seatTypeId = sweet.id;

        await prisma.seat.upsert({
          where: { studioId_row_number: { studioId: studio.id, row, number } },
          update: {},
          create: {
            studioId: studio.id,
            row,
            number,
            seatTypeId,
            active: true,
          },
        });
      }
    }
  }

  console.log('✔ seats seeded');
  await prisma.$disconnect();
}
