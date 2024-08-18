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

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('users/:userId/columns')
@UseGuards(UserAuthGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  getAllColumns(@Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.getAllColumns(Number(userId));
  }

  @Get(':columnId')
  getColumn(@Param('columnId') columnId: number, @Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.getColumn(Number(userId), Number(columnId));
  }

  @Post()
  createColumn(@Body() data: CreateColumnDto, @Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.createColumn(data.title, Number(userId));
  }

  @Patch(':columnId')
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
  async deleteColumn(@Param('columnId') columnId: number, @Req() req: Request) {
    const { id: userId } = req['user'];
    return this.columnsService.deleteColumn(Number(columnId), Number(userId));
  }
}
