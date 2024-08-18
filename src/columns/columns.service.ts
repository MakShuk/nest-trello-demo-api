import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  getColumn(userId: number, columnId: number) {
    return this.prisma.column.findUnique({
      where: {
        id: columnId,
        userId: userId,
      },
    });
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

  updateColumn(columnId: number, userId: number, data: { title: string }) {
    return this.prisma.column.update({
      where: {
        id: columnId,
        userId: userId,
      },
      data,
    });
  }

  deleteColumn(columnId: number, userId: number) {
    return this.prisma.column.delete({
      where: {
        id: columnId,
        userId: userId,
      },
    });
  }
}
