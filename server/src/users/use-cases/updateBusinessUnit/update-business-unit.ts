import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Roles } from '@shared/constants';
import { UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class UpdateBusinessUnit {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    id,
    responsible,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User> {
    if (!new_bu) throw new BadRequestException('Business unit is required');
    if (!id) throw new BadRequestException('User id is required');
    if (!responsible) throw new BadRequestException('Responsible is required');

    const user = await this.usersRepository.findOne(id);
    const updateResponsible = await this.usersRepository.findOne(responsible);

    if (!user || !updateResponsible) {
      throw new BadRequestException('User or responsible does not exist');
    }

    if (updateResponsible.role == Roles.ACADEMY) {
      throw new UnauthorizedException('Academys cannot perform this action');
    }

    if (user.business_unit === new_bu) {
      throw new BadRequestException('User already in this business unit');
    }

    return this.usersRepository.updateBusinessUnit({
      id,
      responsible,
      new_bu,
    });
  }
}
