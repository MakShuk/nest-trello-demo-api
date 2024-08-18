import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    data: CreateCommentDto,
    userId: number,
    columnId: number,
    cardId: number,
  ) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.userId !== userId) {
      throw new ForbiddenException('Column does not belong to the user');
    }

    return this.prisma.comment.create({
      data: {
        content: data.content,
        cardId,
        userId,
      },
    });
  }

  getAllComments(userId: number) {
    return this.prisma.comment.findMany({
      where: { userId },
    });
  }

  async updateComment(
    userId: number,
    columnId: number,
    commentId: number,
    data: CreateCommentDto,
  ) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.userId !== userId) {
      throw new ForbiddenException('Column does not belong to the user');
    }

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment does not exist');
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data,
    });
  }

  async getComment(userId: number, columnId: number, commentId: number) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.userId !== userId) {
      throw new ForbiddenException('Column does not belong to the user');
    }

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment does not exist');
    }
    return comment;
  }

  async deleteComment(userId: number, columnId: number, commentId: number) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.userId !== userId) {
      throw new ForbiddenException('Column does not belong to the user');
    }

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment does not exist');
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
