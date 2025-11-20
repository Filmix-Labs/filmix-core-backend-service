import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { UserPayload } from '../types/user-payload.type';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // if endpoint has no permission requirement -> allow
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const user = req?.user as UserPayload;

    if (!user) {
      // No user present (not authenticated) -> forbid
      throw new ForbiddenException('User not authenticated');
    }

    const userPermissions: string[] = user.permissions || [];

    const hasAll = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasAll) throw new ForbiddenException('Insufficient permissions');

    return true;
  }
}
