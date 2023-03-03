import { Injectable } from '@nestjs/common';

import { UpdateStatusDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

@Injectable()
export class UpdateStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    collaboration_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Collaboration> {
    const collaboration: Collaboration =
      await this.collaborationsRepository.findOne(collaboration_id);

    if (!collaboration) {
      throw new Error('Collaboration not found!');
    }

    return this.collaborationsRepository.updateStatus({
      collaboration_id,
      newStatus,
    });
  }
}
