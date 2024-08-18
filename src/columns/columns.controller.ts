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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './columns.dto';
import { UserAuthGuard } from 'src/guards/user.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('columns')
@ApiBearerAuth()
@Controller('users/:userId/columns')
@UseGuards(UserAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all columns for a user' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all columns for the user.',
  })
  getAllColumns(@Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.getAllColumns(Number(userId));
  }

  @Get(':columnId')
  @ApiOperation({ summary: 'Get a specific column' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'number', description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Returns the specified column.' })
  @ApiResponse({ status: 404, description: 'Column not found.' })
  getColumn(@Param('columnId') columnId: number, @Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.getColumn(Number(userId), Number(columnId));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new column' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiBody({ type: CreateColumnDto })
  @ApiResponse({ status: 201, description: 'Column created successfully.' })
  createColumn(@Body() data: CreateColumnDto, @Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.createColumn(data.title, Number(userId));
  }

  @Patch(':columnId')
  @ApiOperation({ summary: 'Update a column' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'number', description: 'Column ID' })
  @ApiBody({ type: CreateColumnDto })
  @ApiResponse({ status: 200, description: 'Column updated successfully.' })
  @ApiResponse({ status: 404, description: 'Column not found.' })
  async updateColumn(
    @Param('columnId') columnId: number,
    @Body() data: CreateColumnDto,
    @Req() req: Request,
  ) {
    const { id: userId } = req['user'];
    return this.columnsService.updateColumn(
      Number(columnId),
      Number(userId),
      data,
    );
  }

  @Delete(':columnId')
  @ApiOperation({ summary: 'Delete a column' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiParam({ name: 'columnId', type: 'number', description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Column not found.' })
  async deleteColumn(@Param('columnId') columnId: number, @Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.deleteColumn(Number(columnId), Number(userId));
  }
}
