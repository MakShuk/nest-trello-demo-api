import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  createCard(
    @Req() req: Request,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return `This action creates a card for user ${userId} in column ${columnId}`;
  }

  @Get()
  getAllCards(
    @Req() req: Request,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return `This action returns all cards for user ${userId} in column ${columnId}`;
  }
}
 