import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterCollaborationUseCase {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute(collaboration: Collaboration): Promise<Collaboration> {
    const registeredCollaboration =
      await this.collaborationsRepository.register(collaboration);

    return registeredCollaboration;
  }
}
