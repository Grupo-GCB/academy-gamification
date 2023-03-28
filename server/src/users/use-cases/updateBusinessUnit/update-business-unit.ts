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
        'Id do Usuário, Id do Responsável e a Unidade de Negócio São Exigidos!',
      );
    }

    const user = await this.usersRepository.findById(id);
    const updateResponsible = await this.usersRepository.findById(responsible);

    if (!user || !updateResponsible) {
      throw new BadRequestException('Usuário ou Responsável Não Existem!');
    }

    if (
      updateResponsible.role == Roles.COLLABORATOR &&
      user != updateResponsible
    ) {
      throw new UnauthorizedException(
        'Colaboradores Somente Podem Editar Sua Própria Unidade de Negócio!',
      );
    }

    if (updateResponsible.role == Roles.ACADEMY) {
      throw new UnauthorizedException('Sem Autorização!');
    }

    if (user.business_unit === new_bu) {
      throw new BadRequestException(
        'Usuário Já Pertence a Essa Unidade de Negócio!',
      );
    }

    return this.usersRepository.updateBusinessUnit({
      id,
      responsible,
      new_bu,
    });
  }
}
