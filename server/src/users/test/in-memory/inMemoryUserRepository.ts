import { RegisterUserDTO, UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUpdatePassword } from '@users/interfaces/IUpdatePassword';
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

  async updateBusinessUnit({
    id,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    const user = await this.findOne(id);

    user.business_unit = new_bu;

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);

    user.deleted_at = new Date();
  }

  async updatePassword({ id, new_password }: IUpdatePassword): Promise<User> {
    const user = await this.findOne(id);

    user.password = new_password;

    return user;
  }
}
