import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Controller('users/:id/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  getAllColumns() {
    return this.columnsService.getAllColumns();
  }

  @Get(':id')
  getUserColumns(@Param('id') id: string) {
    return this.columnsService.getUserColumns(id);
  }

  @Post()
  createColumn(@Body() data: { title: string; userId: string }) {
    return this.columnsService.createColumn(data.title, data.userId);
  }
}
