import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { UserAuthGuard } from 'src/guards/user.guard';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('users')
@UseGuards(UserAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async findUser(@Param('userId') userId: number, @Req() req: Request) {
    return this.usersService.findOne(Number(userId));
  }

  @Patch(':userId')
  async updateUser(@Body() data: UpdateUserDto, @Req() req: Request) {
    const reqUserId = Number(req['user'].id);
    return this.usersService.updateUser(reqUserId, data);
  }

  @Delete(':userId')
  async deleteUser(@Req() req: Request) {
     const reqUserId = Number(req['user'].id);
    return this.usersService.delete(reqUserId);
  }
}
