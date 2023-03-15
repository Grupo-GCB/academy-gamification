import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class FindByEmail {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne(email);

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
