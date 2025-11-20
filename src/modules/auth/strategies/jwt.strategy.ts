import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import jwtConfig from '@/common/config/jwt.config';
import { AuthPayload } from '@/common/types/auth.type';
import { PrismaService } from '@/database/prisma.service'; // your Prisma wrapper

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    config: ConfigType<typeof jwtConfig>,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
      ignoreExpiration: false,
    });
  }

  // payload is whatever you put in the JWT (e.g. { sub: userId })
  async validate(payload: AuthPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true }, // RolePermission -> permission
            },
          },
        },
      },
    });

    if (!user) return null;

    // collect permission names from role -> role.permissions -> permission.name
    const rolePermissions = (user.role?.permissions || []).map(
      (rp) => rp.permission.name,
    );

    // You may add direct user-level permissions here if implemented later.
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role?.name,
      permissions: Array.from(new Set(rolePermissions)),
    };
  }
}
