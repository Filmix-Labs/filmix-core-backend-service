import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import jwtConfig from '@/common/config/jwt.config';
import { type AuthPayload } from '@/common/types/auth.type';
import { formatResponse } from '@/common/utils/response.util';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Register new user
   */
  async register(dto: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser)
      throw new BadRequestException('Email is already registered');

    const role = await this.prismaService.role.findFirst({
      where: { name: 'user' },
    });

    if (!role) throw new InternalServerErrorException('Default role not found');

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    await this.prismaService.user.create({
      data: {
        email: dto.email.toLowerCase(),
        name: dto.name,
        password: hashedPassword,
        roleId: role.id,
      },
    });

    return formatResponse('success', 201, 'Registration successful');
  }

  /**
   * Login user
   */
  async login(dto: LoginDto) {
    console.time('login.validateUser');
    const user = await this.validateUser(dto.email, dto.password);
    console.timeEnd('login.validateUser');

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload: AuthPayload = {
      sub: user.id,
    };

    console.time('login.signJwt');
    const accessToken = await this.jwtService.signAsync<AuthPayload>(payload, {
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.expiresIn,
    });
    console.timeEnd('login.signJwt');

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
    };
  }

  /**
   * Validate incoming login credentials
   */
  async validateUser(email: string, password: string) {
    console.time('validateUser.findUnique');
    const user = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        role: true,
      },
    });
    console.timeEnd('validateUser.findUnique');

    if (!user) return null;

    console.time('validateUser.compare');
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.timeEnd('validateUser.compare');
    if (!isValidPassword) return null;

    return user;
  }
}
