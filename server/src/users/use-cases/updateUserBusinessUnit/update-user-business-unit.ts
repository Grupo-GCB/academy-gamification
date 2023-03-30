import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Roles } from '@shared/constants';
import { UpdateUserBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class UpdateUserBusinessUnit {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    responsible,
    new_bu,
  }: UpdateUserBusinessUnitDTO): Promise<User> {
    if (!new_bu || !email || !responsible) {
      throw new BadRequestException(
        'E-mail do usuário, e-mail do responsável e a unidade de negócio são exigidos!',
      );
    }

    const user = await this.usersRepository.findByEmail(email);
    const updateResponsible = await this.usersRepository.findByEmail(
      responsible,
    );

    if (!user || !updateResponsible) {
      throw new BadRequestException('Usuário ou responsável não existem!');
    }

    if (
      updateResponsible.role === Roles.COLLABORATOR &&
      user != updateResponsible
    ) {
      throw new UnauthorizedException(
        'Colaboradores podem editar somente sua própria unidade de negócio!',
      );
    }

    if (updateResponsible.role === Roles.ACADEMY) {
      throw new UnauthorizedException('Sem autorização!');
    }

    if (user.business_unit === new_bu) {
      throw new BadRequestException(
        'Usuário já pertence a essa unidade de negócio!',
      );
    }

    return this.usersRepository.updateUserBusinessUnit({
      email,
      responsible,
      new_bu,
    });
  }
}
