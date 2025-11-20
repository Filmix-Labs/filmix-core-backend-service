import { Cinema, PrismaClient, Theater } from '@prisma/client';

export async function seedTheaters(cinemas: Cinema[], prisma: PrismaClient) {
  // realistic-sounding theaters across Jakarta area & nearby malls
  const theatersData = [
    {
      name: 'XXI - Grand Indonesia',
      address: 'Jl. MH Thamrin No.1, Jakarta',
      cinemaName: 'XXI',
    },
    {
      name: 'CGV - Grand Indonesia',
      address: 'Jl. MH Thamrin No.1, Jakarta',
      cinemaName: 'CGV',
    },
    {
      name: 'CGV - Central Park',
      address: 'Jl. Letjen S. Parman No.28, Jakarta',
      cinemaName: 'CGV',
    },
    {
      name: 'XXI - AEON Mall BSD',
      address: 'BSD City, Tangerang',
      cinemaName: 'XXI',
    },
    {
      name: 'Cinepolis - Pejaten Village',
      address: 'Pejaten Village Mall, Jakarta Selatan',
      cinemaName: 'Cinepolis',
    },
    {
      name: 'Flix - Ashta District 8',
      address: 'Senayan, Jakarta',
      cinemaName: 'Flix Cinema',
    },
    {
      name: 'XXI - Summarecon Bekasi',
      address: 'Summarecon Bekasi, Bekasi',
      cinemaName: 'XXI',
    },
    {
      name: 'Cinepolis - Kota Kasablanka',
      address: 'Kota Kasablanka Mall, Jakarta',
      cinemaName: 'Cinepolis',
    },
  ];

  const created: Theater[] = [];
  for (const t of theatersData) {
    const cinema = cinemas.find((c) => c.name === t.cinemaName);
    if (!cinema) continue;

    const exist = await prisma.theater.findFirst({
      where: { name: t.name, cinemaId: cinema.id },
    });
    if (exist) {
      created.push(exist);
      continue;
    }

    const item = await prisma.theater.create({
      data: {
        name: t.name,
        address: t.address,
        cinemaId: cinema.id,
      },
    });
    created.push(item);
  }

  console.log('✔ theaters seeded');
  await prisma.$disconnect();
  return created;
}
