import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: Prisma.UserUpdateInput) {
    const updateUser = this.prisma.user.update({
      where: { id: id },
      data,
    });
    return `User with id ${id} has been updated`;
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
