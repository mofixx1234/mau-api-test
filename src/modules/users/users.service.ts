import { randomUUID } from 'node:crypto';

import { ConflictException, NotFoundException } from '../../common/errors/http.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export class UsersService {
  private readonly users: User[] = [
    {
      id: randomUUID(),
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((currentUser) => currentUser.id === id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  create(payload: CreateUserDto): User {
    this.assertEmailIsAvailable(payload.email);

    const now = new Date().toISOString();
    const user: User = {
      id: randomUUID(),
      ...payload,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(user);
    return user;
  }

  update(id: string, payload: UpdateUserDto): User {
    const user = this.findOne(id);

    if (payload.email && payload.email !== user.email) {
      this.assertEmailIsAvailable(payload.email);
    }

    Object.assign(user, payload, {
      updatedAt: new Date().toISOString(),
    });

    return user;
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }

  private assertEmailIsAvailable(email: string): void {
    const emailAlreadyExists = this.users.some((user) => user.email === email);

    if (emailAlreadyExists) {
      throw new ConflictException(`Email ${email} is already used`);
    }
  }
}
