import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  async getColumn(userId: number, columnId: number) {
    const column = await this.prisma.column.findUnique({
      where: {
        id: columnId,
        userId: userId,
      },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }
    return column;
  }

  getAllColumns(userId: number) {
    return this.prisma.column.findMany({
      where: {
        userId: userId,
      },
    });
  }

  createColumn(title: string, userId: number) {
    return this.prisma.column.create({
      data: {
        title,
        userId: userId,
      },
    });
  }

  async updateColumn(
    columnId: number,
    userId: number,
    data: { title: string },
  ) {
    const column = await this.prisma.column.findUnique({
      where: {
        id: columnId,
        userId: userId,
      },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const updatedColumn = await this.prisma.column.update({
      where: { id: columnId },
      data,
    });

    return { title: updatedColumn.title };
  }

  async deleteColumn(columnId: number, userId: number) {
    const column = await this.prisma.column.findUnique({
      where: {
        id: columnId,
        userId: userId,
      },
    });
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    await this.prisma.column.delete({
      where: { id: columnId },
    });
    return { message: 'Column deleted successfully' };
  }
}
