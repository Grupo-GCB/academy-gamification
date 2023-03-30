import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { isUuidValid } from '@shared/utils';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class DeleteUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    if (!isUuidValid(id)) throw new BadRequestException('Id inválido!');

    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('Usuário não existe!');

    await this.usersRepository.delete(id);
  }
}
