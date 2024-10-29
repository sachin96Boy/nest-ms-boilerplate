import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { User } from './db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @MessagePattern('getUserById')
  async getUserById(query: { id: number }): Promise<User> {
    return await this.usersRepository.findOneBy({ id: query.id });
  }

  @MessagePattern('getUserByEmail')
  async getUserByEmail(query: { email: string }): Promise<User> {
    return await this.usersRepository.findOneBy({ email: query.email });
  }

  @MessagePattern('createUser')
  async createUser(data: Record<string, any>): Promise<User> {
    const newUser = this.usersRepository.create(data);
    const user = await this.usersRepository.save(newUser);
    return user;
  }
}
