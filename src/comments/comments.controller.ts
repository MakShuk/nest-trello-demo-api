import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UserAuthGuard } from 'src/guards/user.guard';
import { CreateCommentDto } from './comment.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
@UseGuards(UserAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(
    @Body() data: CreateCommentDto,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.commentsService.createComment(
      data,
      Number(userId),
      Number(columnId),
      Number(cardId),
    );
  }

  @Get()
  getAllComments(@Param('userId') userId: string) {
    return this.commentsService.getAllComments(Number(userId));
  }

  @Get(':commentId')
  getComment(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.getComment(
      Number(userId),
      Number(columnId),
      Number(commentId),
    );
  }

  @Patch(':commentId')
  updateComment(
    @Body() data: CreateCommentDto,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.updateComment(
      Number(userId),
      Number(columnId),
      Number(cardId),
      data,
    );
  }

  @Delete(':commentId')
  deleteComment(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.deleteComment(
      Number(userId),
      Number(columnId),
      Number(commentId),
    );
  }
}
