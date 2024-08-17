import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Public()
  @Get()
  getHello(@Req() req: Request): string {
    //const { id: userId } = req['user'];
    const userAgent = req.headers['user-agent']; // Получаем заголовок "User-Agent"
    return `User-Agent: ${userAgent}`;
  }
}
