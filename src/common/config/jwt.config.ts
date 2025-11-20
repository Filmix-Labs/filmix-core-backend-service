import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET as string,
  expiresIn: (process.env.JWT_EXPIRES_IN ?? '15m') as
    | `${number}${'m' | 'h' | 'd'}`
    | number,
}));
