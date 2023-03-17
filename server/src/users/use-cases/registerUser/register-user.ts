import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Utils } from '@shared/utils/utils';

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
    business_unit,
    role,
  }: RegisterUserDTO): Promise<User> {
    const emailFormat = /^[a-z]+.[a-z]+@gcbinvestimentos.com$/;

    const isValidEmail: boolean = emailFormat.test(email);

    if (!isValidEmail) {
      throw new UnauthorizedException('Invalid email');
    }

    // Dar um findByEmail com o email passado e validar se já existe este email cadastrado

    const utils = new Utils();

    const hashPassword = utils.generateRandomString(8);

    password = hashPassword;

    const user = await this.userRepository.create({
      name,
      email,
      password,
      business_unit,
      role,
    });

    return user;
  }
}
