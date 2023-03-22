import { Injectable } from '@nestjs/common';

import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class ListAllUsers {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
