import { Module } from '../../common/types/module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export class UsersModule implements Module {
  private readonly usersService = new UsersService();

  readonly controllers = [
    new UsersController(this.usersService),
  ];
}
