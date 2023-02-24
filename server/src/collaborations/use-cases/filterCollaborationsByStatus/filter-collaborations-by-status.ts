import { NotFoundException } from '@nestjs/common';
import {
  Collaboration,
  CollaborationsStatus,
} from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

export class FindPendingCollaborations {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute(
    status: CollaborationsStatus,
    id: string,
  ): Promise<Collaboration[]> {
    const pendingCollaborations =
      await this.collaborationsRepository.filterCollaborationsByStatus(
        status,
        id,
      );

    if (pendingCollaborations.length === 0) {
      throw new NotFoundException(
        `Academy does not have ${status} collaborations`,
      );
    }

    return pendingCollaborations;
  }
}
