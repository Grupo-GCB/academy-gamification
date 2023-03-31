import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilterUserByRoleDTO, UpdateUserBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities';
import { IRegisterUser, IUpdateUserPassword } from '@users/interfaces';

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

    const savedUser = await this.usersRepository.save(user);

    delete savedUser.password;

    return savedUser;
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        business_unit: true,
        role: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        business_unit: true,
        role: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });
  }

  async updateUserBusinessUnit({
    email,
    new_bu,
  }: UpdateUserBusinessUnitDTO): Promise<User> {
    await this.usersRepository.update({ email }, { business_unit: new_bu });

    return this.findByEmail(email);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.softDelete({ id });
  }

  async updateUserPassword({
    email,
    new_password,
  }: IUpdateUserPassword): Promise<void> {
    await this.usersRepository.update({ email }, { password: new_password });
  }

  async filterByRole({ role }: FilterUserByRoleDTO): Promise<User[]> {
    return this.usersRepository.find({
      where: { role },
      select: {
        id: true,
        name: true,
        email: true,
        business_unit: true,
        role: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });
  }
}
