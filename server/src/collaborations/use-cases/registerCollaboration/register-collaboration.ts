import { RegisterCollaborationDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

export class RegisterCollaboration {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute(data: RegisterCollaborationDTO): Promise<Collaboration> {
    return this.collaborationsRepository.register(data);
  }
}
