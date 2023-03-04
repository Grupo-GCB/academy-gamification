import { RegisterCollaborationDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterCollaboration {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute(data: RegisterCollaborationDTO): Promise<Collaboration> {
    console.log('use-case', data);
    return this.collaborationsRepository.register(data);
  }
}
