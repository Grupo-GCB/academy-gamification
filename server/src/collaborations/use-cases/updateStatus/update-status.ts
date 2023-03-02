import { Injectable } from '@nestjs/common';

import { UpdateStatusDTO } from 'src/collaborations/dto/update-status.dto';
import { Collaboration } from 'src/collaborations/infra/typeorm/entities/collaboration.entity';

@Injectable()
export class UpdateStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    collaboration_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Collaboration> {
    const collaboration = await this.collaborationsRepository.findById(
      collaboration_id,
    );

    if (!collaboration) {
      throw new Error('Collaboration not found!');
    }

    const isValidStatus = newStatus.includes('enum');

    if (!isValidStatus) {
      throw new Error('Invalid status!');
    }

    collaboration.status = newStatus;

    return this.collaborationsRepository.updateStatus({
      collaboration_id,
      newStatus,
    });
  }
}
