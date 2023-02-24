import { Injectable } from '@nestjs/common';
import { Collaboration } from 'src/collaborations/infra/typeorm/entities/collaboration.entity';
import { AcademyCollaboration } from 'src/shared/constants';

@Injectable()
export class RegisterCollaborationUseCase {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute(collaboration: AcademyCollaboration): Promise<Collaboration> {
    const registeredCollaboration =
      await this.collaborationsRepository.register(collaboration);

    return registeredCollaboration;
  }
}
