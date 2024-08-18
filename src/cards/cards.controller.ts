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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('users/:userId/columns/:columnId/cards')
@UseGuards(UserAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({ status: 201, description: 'Card created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createCard(
    @Body() data: CreateCardDto,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.cardsService.createCard(data, Number(columnId), Number(userId));
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards for a column' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all cards for the column.',
  })
  getAllCards(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.cardsService.getAllCards(Number(columnId), Number(userId));
  }

  @Patch(':cardId')
  @ApiOperation({ summary: 'Update a card' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: 'string', description: 'Card ID' })
  @ApiBody({ type: UpdateCardDto })
  @ApiResponse({ status: 200, description: 'Card updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
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
  @ApiOperation({ summary: 'Delete a card' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: 'string', description: 'Card ID' })
  @ApiResponse({ status: 200, description: 'Card deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
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