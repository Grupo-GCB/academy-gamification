import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Roles } from '@shared/constants';
import { UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class UpdateBusinessUnit {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    responsible,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    if (!new_bu || !id || !responsible) {
      throw new BadRequestException(
        'Id do usuário, id do responsável e a unidade de negócio são exigidos!',
      );
    }

    const user = await this.usersRepository.findById(id);
    const updateResponsible = await this.usersRepository.findById(responsible);

    if (!user || !updateResponsible) {
      throw new BadRequestException('Usuário ou responsável não existem!');
    }

    if (
      updateResponsible.role == Roles.COLLABORATOR &&
      user != updateResponsible
    ) {
      throw new UnauthorizedException(
        'Colaboradores somente podem editar sua própria unidade de negócio!',
      );
    }

    if (updateResponsible.role == Roles.ACADEMY) {
      throw new UnauthorizedException('Sem autorização!');
    }

    if (user.business_unit === new_bu) {
      throw new BadRequestException(
        'Usuário já pertence a essa unidade de negócio!',
      );
    }

    return this.usersRepository.updateBusinessUnit({
      id,
      responsible,
      new_bu,
    });
  }
}
