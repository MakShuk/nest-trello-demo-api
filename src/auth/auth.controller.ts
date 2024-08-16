import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    console.log(`email: ${email}, password: ${password}`);
     const { id } = await this.authService.validatePassword(password, email);
    return this.authService.login(String(id));
  }
}
