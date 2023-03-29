import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUuidValid } from '@shared/utils';

import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class FindById {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    if (!isUuidValid(id)) throw new BadRequestException('Id inválido!');

    const user: User = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('Usuário não existe!');

    return user;
  }
}
