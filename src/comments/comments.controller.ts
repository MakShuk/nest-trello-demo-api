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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
@UseGuards(UserAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: 'string', description: 'Card ID' })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
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
  @ApiOperation({ summary: 'Get all comments for a user' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Returns all comments.' })
  getAllComments(@Param('userId') userId: string) {
    return this.commentsService.getAllComments(Number(userId));
  }

  @Get(':commentId')
  @ApiOperation({ summary: 'Get a single comment' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: 'string', description: 'Card ID' })
  @ApiParam({ name: 'commentId', type: 'string', description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Returns the comment.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
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
  @ApiOperation({ summary: 'Update a comment' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: 'string', description: 'Card ID' })
  @ApiParam({ name: 'commentId', type: 'string', description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  updateComment(
    @Body() data: CreateCommentDto,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.commentsService.updateComment(
      Number(userId),
      Number(columnId),
      Number(cardId),
      data,
    );
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'string', description: 'Column ID' })
  @ApiParam({ name: 'commentId', type: 'string', description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  deleteComment(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.deleteComment(
      Number(userId),
      Number(columnId),
      Number(commentId),
    );
  }
}
