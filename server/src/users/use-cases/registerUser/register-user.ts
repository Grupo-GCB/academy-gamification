import { SendGridService } from '@anchan828/nest-sendgrid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import crypto from 'node:crypto';

import { Academys, Admins, Roles } from '@shared/constants';
import { RegisterUserDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class RegisterUser {
  constructor(
    private userRepository: IUsersRepository,
    private readonly sendGrid: SendGridService,
  ) {}

  async execute({ email, business_unit }: RegisterUserDTO): Promise<User> {
    const emailFormat = /^[a-z]+.[a-z]+@gcbinvestimentos.com$/;

    const isValidEmail: boolean = emailFormat.test(email);

    if (!isValidEmail) {
      throw new BadRequestException('Invalid email');
    }

    const splittedEmail = email.split('@');

    const splittedName = splittedEmail[0].split('.');

    const firstName =
      splittedName[0].charAt(0).toUpperCase() + splittedName[0].slice(1);
    const lastName =
      splittedName[1].charAt(0).toUpperCase() + splittedName[1].slice(1);

    const name = `${firstName} ${lastName}`;

    const buffer = crypto.randomBytes(8);
    const passwordAsRandomString = buffer.toString('hex');
    const hashedPassword = await hash(passwordAsRandomString, 8);

    const roleByEmail = {
      [Admins.ADMIN]: Roles.ADMIN,
      [Academys.ACADEMY1]: Roles.ACADEMY,
      [Academys.ACADEMY2]: Roles.ACADEMY,
      [Academys.ACADEMY3]: Roles.ACADEMY,
      [Academys.ACADEMY4]: Roles.ACADEMY,
    };

    const role = roleByEmail[email] ?? Roles.COLLABORATOR;

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      business_unit,
      role,
    });

    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Registro no AcadeMe',
      text: `Você se registrou no AcadeMe com sucesso! 
Criamos uma senha inicial para você realizar o seu login. 
Sua senha é: ${passwordAsRandomString}`,
    });

    return user;
  }
}
