import { UserPayload } from './user-payload';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}
