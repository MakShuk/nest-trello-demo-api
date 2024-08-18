import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Public } from 'src/decorators/custom.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async login(@Body() { email, password }: LoginDto) {
    const { id } = await this.authService.validatePassword(password, email);
    return this.authService.login(String(id));
  }
}
