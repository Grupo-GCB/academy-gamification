import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateStatusDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { UserRoles } from '@shared/constants';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';
import { FindById } from '@users/use-cases/findById/find-by-id';

@Injectable()
export class UpdateStatus {
  constructor(
    private collaborationsRepository: ICollaborationsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    collaboration_id,
    newStatus,
    admin_id,
  }: UpdateStatusDTO): Promise<Collaboration> {
    if (!newStatus) throw new BadRequestException('newStatus is required');
    const findById = new FindById(this.usersRepository);
    const user = findById.execute(admin_id);
    if ((await user).role != UserRoles.ADMIN) {
      throw new Error('You should must be a administrator');
    }

    const collaboration: Collaboration =
      await this.collaborationsRepository.findOne(collaboration_id);

    if (!collaboration) {
      throw new NotFoundException('Collaboration not found');
    }

    return this.collaborationsRepository.updateStatus({
      collaboration_id,
      newStatus,
      admin_id,
    });
  }
}
