import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './users.dto';
import e from 'express';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateUser(id: number, data: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: { id: id },
      data,
    });
    return { email: updateUser.email, username: updateUser.username };
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findOne(id: number) {
    const { email, createdAt, username } = await this.prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        email: true,
        createdAt: true,
      },
    });
    return { username, email, createdAt };
  }
}
