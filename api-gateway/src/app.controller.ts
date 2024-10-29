import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async getHello(): Promise<string> {
    return '<h1 style="text-align: center; margin-top: 100px">Welcome! to Spare Parts Marketplace Backend</h1>';
  }
}
