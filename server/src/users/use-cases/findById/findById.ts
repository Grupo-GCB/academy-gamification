import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class FindById {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user: User = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
