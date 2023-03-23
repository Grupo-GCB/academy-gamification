import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Roles } from '@shared/constants';
import { UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

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
        'User id, Responsible id and Business unit are required',
      );
    }

    const user = await this.usersRepository.findById(id);
    const updateResponsible = await this.usersRepository.findById(responsible);

    if (!user || !updateResponsible) {
      throw new BadRequestException('User or responsible does not exist');
    }

    if (
      updateResponsible.role == Roles.COLLABORATOR &&
      user != updateResponsible
    ) {
      throw new UnauthorizedException(
        'Collaborators can only update their own business unit',
      );
    }

    if (updateResponsible.role == Roles.ACADEMY) {
      throw new UnauthorizedException('Academys cannot perform this action');
    }

    if (user.business_unit === new_bu) {
      throw new BadRequestException(
        'User already belongs to this business unit',
      );
    }

    return this.usersRepository.updateBusinessUnit({
      id,
      responsible,
      new_bu,
    });
  }
}
