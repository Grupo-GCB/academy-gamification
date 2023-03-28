import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class FindByEmail {
  constructor(private userRepository: IUsersRepository) {}

  async execute(email: string): Promise<User> {
    const user: User = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException('Usuário não existe!');

    return user;
  }
}
