import { NotFoundException } from '@nestjs/common';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { FilterCollaborationByStatusDto } from '@collaborations/dto/filter-collaboration-by-status.dto';

export class FilterCollaborationsByStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    status,
    id,
  }: FilterCollaborationByStatusDto): Promise<Collaboration[]> {
    const pendingCollaborations =
      await this.collaborationsRepository.filterCollaborationsByStatus({
        status,
        id,
      });

    if (pendingCollaborations.length === 0) {
      throw new NotFoundException('No collaborations were found');
    }

    return pendingCollaborations;
  }
}
