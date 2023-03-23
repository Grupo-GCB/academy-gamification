import { RegisterUserDTO, UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: RegisterUserDTO): Promise<User> {
    const user: User = Object.assign(new User(), data);

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async updateBusinessUnit({
    id,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    const user = await this.findById(id);

    user.business_unit = new_bu;

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    user.deleted_at = new Date();
  }
}
