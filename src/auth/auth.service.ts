import { Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, password, username }: RegisterDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (oldUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.getPasswordHash(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        username,
      },
    });
    return {
      email: newUser.email,
      username: newUser.username,
      passwordHash,
      id: newUser.id,
    };
  }

  async validatePassword(password: string, email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`Password or login is incorrect`);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new Error(`Password or login is incorrect`);
    }
    return { id: user.id, email: user.email, username: user.username };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({
        id,
      }),
    };
  }

  private async getPasswordHash(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
