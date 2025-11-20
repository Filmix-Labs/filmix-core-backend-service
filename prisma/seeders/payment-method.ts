import { PrismaClient } from '@prisma/client';

export async function seedPaymentMethods(prisma: PrismaClient) {
  const types = [
    { name: 'E-Wallet' },
    { name: 'Bank Transfer' },
    { name: 'Card' },
  ];

  const createdTypes: any[] = [];
  for (const t of types) {
    const pmType = await prisma.paymentMethodType.upsert({
      where: { name: t.name },
      update: {},
      create: t,
    });
    createdTypes.push(pmType);
  }

  const methods = [
    { code: 'GOPAY', name: 'GoPay', paymentMethodType: 'E-Wallet' },
    { code: 'OVO', name: 'OVO', paymentMethodType: 'E-Wallet' },
    { code: 'DANA', name: 'DANA', paymentMethodType: 'E-Wallet' },
    { code: 'SHOPEEPAY', name: 'ShopeePay', paymentMethodType: 'E-Wallet' },
    {
      code: 'BCA_VA',
      name: 'BCA Virtual Account',
      paymentMethodType: 'Bank Transfer',
    },
    {
      code: 'MANDIRI_VA',
      name: 'Mandiri Virtual Account',
      paymentMethodType: 'Bank Transfer',
    },
    { code: 'CARD', name: 'Credit/Debit Card', paymentMethodType: 'Card' },
  ];

  for (const m of methods) {
    const type = createdTypes.find((t) => t.name === m.paymentMethodType);
    if (!type) continue;
    await prisma.paymentMethod.upsert({
      where: { code: m.code },
      update: {},
      create: {
        code: m.code,
        name: m.name,
        paymentMethodTypeId: type.id,
      },
    });
  }

  console.log('✔ payment methods seeded');
  await prisma.$disconnect();
}
