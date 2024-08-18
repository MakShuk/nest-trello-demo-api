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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(UserAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Returns the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findUser(@Param('userId') userId: number, @Req() req: Request) {
    return this.usersService.findOne(Number(userId));
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUser(@Body() data: UpdateUserDto, @Req() req: Request) {
    const reqUserId = Number(req['user'].id);
    return this.usersService.updateUser(reqUserId, data);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Req() req: Request) {
    const reqUserId = Number(req['user'].id);
    return this.usersService.delete(reqUserId);
  }
}