import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

import { User } from '@users/infra/entities';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class ValidateUser {
  constructor(private userRepository: IUsersRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const user: User = await this.userRepository.findByEmail(email);

    if (user) {
      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.password,
      );
      if (isPasswordValid) return { ...user, password: undefined };
    }

    throw new Error('Endereço de e-mail ou senha incorretos!');
  }
}
