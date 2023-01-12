import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO - remove this and add a protected route to get current user
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
