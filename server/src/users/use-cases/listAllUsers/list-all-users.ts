import { Injectable } from '@nestjs/common';

import { User } from '@users/infra/entities';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class ListAllUsers {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
