import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    //return this.authService.register(dto);
    console.log('register');
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
   // const { id } = await this.authService.validatePassword(password, email);
    // return this.authService.login(id);
    console.log('login');
  }
}
