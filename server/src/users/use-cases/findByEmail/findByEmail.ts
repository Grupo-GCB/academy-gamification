import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@users/infra/entities';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class FindByEmail {
  constructor(private userRepository: IUsersRepository) {}

  async execute(email: string): Promise<User> {
    const user: User = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
