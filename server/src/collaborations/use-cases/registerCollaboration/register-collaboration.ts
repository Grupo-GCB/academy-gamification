import { RegisterCollaborationDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Injectable } from '@nestjs/common';
import { UserRoles } from '@shared/constants';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';
import { FindById } from '@users/use-cases/findById/find-by-id';

@Injectable()
export class RegisterCollaboration {
  constructor(
    private collaborationsRepository: ICollaborationsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: RegisterCollaborationDTO): Promise<Collaboration> {
    const findById = new FindById(this.usersRepository);
    const user = findById.execute(data.collaborator_id);
    if ((await user).role != UserRoles.COLLABORATOR) {
      throw new Error('You should must be a collaborator');
    }

    return this.collaborationsRepository.register(data);
  }
}
