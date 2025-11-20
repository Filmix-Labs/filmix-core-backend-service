import { PrismaClient, SeatType, Theater } from '@prisma/client';

export async function seedSeatPricing(
  theaters: Theater[],
  seatTypes: SeatType[],
  prisma: PrismaClient,
) {
  const dayTypes = ['weekday', 'weekend'];

  // price logic (in IDR)
  const basePrice = {
    Regular: { weekday: 45000n, weekend: 55000n },
    VIP: { weekday: 90000n, weekend: 110000n },
    SweetBox: { weekday: 150000n, weekend: 180000n },
  };

  for (const theater of theaters) {
    for (const st of seatTypes) {
      for (const day of dayTypes) {
        const where = {
          seatTypeId_theaterId_dayType: {
            seatTypeId: st.id,
            theaterId: theater.id,
            dayType: day,
          },
        };
        const price =
          basePrice[st.name as keyof typeof basePrice]?.[
            day as 'weekday' | 'weekend'
          ] ?? 50000n;
        await prisma.seatPricing.upsert({
          where,
          update: {},
          create: {
            seatTypeId: st.id,
            theaterId: theater.id,
            dayType: day,
            price,
          },
        });
      }
    }
  }

  console.log('✔ seatPricings seeded');
  await prisma.$disconnect();
}
