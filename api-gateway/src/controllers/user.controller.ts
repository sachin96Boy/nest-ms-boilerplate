import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor() {}

  @Get('/current')
  async getLoggedUserName(@Request() request): Promise<string> {
    return request.user;
  }
}
