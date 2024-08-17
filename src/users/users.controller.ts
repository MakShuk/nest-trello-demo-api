import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOneForName(@Param('id') id: number) {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(Number(id));
  }
}
