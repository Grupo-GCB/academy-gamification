import { UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IRegisterUser } from '@users/interfaces/IRegisterUser';
import { IUpdatePassword } from '@users/interfaces/IUpdatePassword';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';
import { hash } from 'bcrypt';

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: IRegisterUser): Promise<User> {
    data.password = await hash(data.password, 8);

    const user: User = Object.assign(new User(), data);

    this.users.push(user);

    return user;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
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

  async updatePassword({ id, new_password }: IUpdatePassword): Promise<void> {
    const user = await this.findById(id);

    user.password = new_password;
  }
}
