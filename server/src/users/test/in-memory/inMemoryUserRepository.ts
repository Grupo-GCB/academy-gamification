import { hash } from 'bcrypt';

import { FilterTransactionsByUserDTO } from '@transactions/dto';
import { UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities';
import {
  IGCBitsBalance,
  IRegisterUser,
  IUpdatePassword,
  IUsersRepository,
} from '@users/interfaces';

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: IRegisterUser): Promise<User> {
    data.password = await hash(data.password, 8);

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
    email,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    const user = await this.findByEmail(email);

    user.business_unit = new_bu;

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    user.deleted_at = new Date();
  }

  async updatePassword({
    email,
    new_password,
  }: IUpdatePassword): Promise<void> {
    const user = await this.findByEmail(email);

    user.password = new_password;
  }

  async getGCBitsBalance({
    user,
  }: FilterTransactionsByUserDTO): Promise<IGCBitsBalance> {
    const user_balance = await this.getGCBitsBalance({ user });

    return { balance: user_balance.balance };
  }
}
