import { BadRequestException, Injectable } from '@nestjs/common';

import { FilterUserByRoleDTO } from '@users/dto';
import { User } from '@users/infra/entities';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class FilterByRole {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ role }: FilterUserByRoleDTO): Promise<User[]> {
    if (!role) throw new BadRequestException('Insira um cargo!');

    const users: User[] = await this.usersRepository.filterByRole({ role });

    return users;
  }
}
