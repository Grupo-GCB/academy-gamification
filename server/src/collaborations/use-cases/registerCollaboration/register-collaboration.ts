import { RegisterCollaborationDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterCollaboration {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    type,
    url,
    collaborator_id,
    business_unit,
    status,
  }: RegisterCollaborationDTO): Promise<Collaboration> {
    return this.collaborationsRepository.register({
      type,
      url,
      collaborator_id,
      business_unit,
      status,
    });
  }
}
