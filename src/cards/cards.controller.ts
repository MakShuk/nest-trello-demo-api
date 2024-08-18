import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { UserAuthGuard } from 'src/guards/user.guard';
import { CreateCardDto, UpdateCardDto } from './cards.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('users/:userId/columns/:columnId/cards')
@UseGuards(UserAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  createCard(
    @Body() data: CreateCardDto,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.cardsService.createCard(data, Number(columnId), Number(userId));
  }

  @Get()
  getAllCards(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.cardsService.getAllCards(Number(columnId), Number(userId));
  }

  @Patch(':cardId')
  updateCard(
    @Body() data: UpdateCardDto,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.cardsService.updateCard(
      Number(cardId),
      Number(columnId),
      Number(userId),
      data,
    );
  }

  @Delete(':cardId')
  deleteCard(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.cardsService.deleteCard(
      Number(cardId),
      Number(columnId),
      Number(userId),
    );
  }
}
