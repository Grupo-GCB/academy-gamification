import { Injectable } from '@nestjs/common';

import { RegisterUserDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class RegisterUser {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUserDTO): Promise<User> {
    const user = await this.userRepository.create({
      name,
      email,
      password,
      role,
    });

    return user;
  }
}
