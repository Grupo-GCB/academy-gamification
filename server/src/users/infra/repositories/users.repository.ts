import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IRegisterUser, IUpdatePassword } from '@users/interfaces';

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
  }: IRegisterUser): Promise<User> {
    const user: User = this.usersRepository.create({
      name,
      email,
      password,
      business_unit,
      role,
    });

    return this.usersRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateBusinessUnit({
    email,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    await this.usersRepository.update({ email }, { business_unit: new_bu });

    return this.findByEmail(email);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.softDelete({ id });
  }

  async updatePassword({
    email,
    new_password,
  }: IUpdatePassword): Promise<void> {
    await this.usersRepository.update({ email }, { password: new_password });
  }
}
