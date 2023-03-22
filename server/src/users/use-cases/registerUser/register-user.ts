import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import crypto from 'crypto';

import { Academys, Admins, Roles } from '@shared/constants';
import { RegisterUserDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class RegisterUser {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ email, business_unit }: RegisterUserDTO): Promise<User> {
    const emailFormat = /^[a-z]+.[a-z]+@gcbinvestimentos.com$/;

    const isValidEmail: boolean = emailFormat.test(email);

    if (!isValidEmail) {
      throw new BadRequestException('Invalid email');
    }

    // Dar um findByEmail com o email passado e validar se já existe este email cadastrado

    const splittedEmail = email.split('@');

    const splittedName = splittedEmail[0].split('.');

    const firstName =
      splittedName[0].charAt(0).toUpperCase() + splittedName[0].slice(1);
    const lastName =
      splittedName[1].charAt(0).toUpperCase() + splittedName[1].slice(1);

    const name = `${firstName} ${lastName}`;

    const buffer = crypto.randomBytes(8);
    const randomString = buffer.toString('hex');
    const password = await hash(randomString, 8);

    //fazer a questão da Role!!

    let role: Roles;

    const emailAsAdmin = email as Admins;
    const emailAsAcademy = email as Academys;

    if (Object.values(Admins).includes(emailAsAdmin)) {
      role = Roles.ADMIN;
    } else if (Object.values(Academys).includes(emailAsAcademy)) {
      role = Roles.ACADEMY;
    } else {
      role = Roles.COLLABORATOR;
    }

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
