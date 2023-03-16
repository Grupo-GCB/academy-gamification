import { RegisterUserDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: RegisterUserDTO): Promise<User> {
    const user: User = Object.assign(new User(), data);

    this.users.push(user);

    return user;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
