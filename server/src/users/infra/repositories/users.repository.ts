import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UpdateBusinessUnitDTO } from '@users/dto';
import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';
import { IUpdatePassword } from '@users/interfaces/IUpdatePassword';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({
    name,
    email,
    password,
    business_unit,
    role,
  }: RegisterUserDTO): Promise<User> {
    const user: User = this.usersRepository.create({
      name,
      email,
      password,
      business_unit,
      role,
    });

    return this.usersRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async updateBusinessUnit({
    id,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    await this.usersRepository.update({ id }, { business_unit: new_bu });

    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.softDelete({ id });
  }

  async updatePassword({ id, new_password }: IUpdatePassword): Promise<User> {
    await this.usersRepository.update({ id }, { password: new_password });

    return this.findOne(id);
  }
}
