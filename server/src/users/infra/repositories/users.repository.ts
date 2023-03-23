import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { UpdateBusinessUnitDTO } from '@users/dto';
import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';

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
    id,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    await this.usersRepository.update({ id }, { business_unit: new_bu });

    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.softDelete({ id });
  }
}
