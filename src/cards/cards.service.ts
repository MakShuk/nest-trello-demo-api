import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCardDto, UpdateCardDto } from './cards.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}
  async createCard(data: CreateCardDto, columnId: number, userId: number) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.userId !== userId) {
      throw new ForbiddenException('Column does not belong to the user');
    }

    return this.prisma.card.create({
      data: {
        title: data.title,
        description: data.description,
        columnId: columnId,
      },
    });
  }

  async getAllCards(columnId: number, userId: number) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.userId !== userId) {
      throw new ForbiddenException('Column does not belong to the user');
    }

    return this.prisma.card.findMany({
      where: { columnId },
    });
  }

  async updateCard(
    cardId: number,
    columnId: number,
    userId: number,
    data: UpdateCardDto,
  ) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.userId !== userId) {
      throw new ForbiddenException('Column does not belong to the user');
    }

    return this.prisma.card.update({
      where: { id: cardId },
      data,
    });
    }
    
    async deleteCard(cardId: number, columnId: number, userId: number) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });
    
        if (!column || column.userId !== userId) {
            throw new ForbiddenException('Column does not belong to the user');
        }
    
        return this.prisma.card.delete({
            where: { id: cardId },
        });
        }
}
