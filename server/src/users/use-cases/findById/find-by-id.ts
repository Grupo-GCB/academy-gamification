import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class FindById {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user: User = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('Usuário Não Existe!');

    return user;
  }
}
