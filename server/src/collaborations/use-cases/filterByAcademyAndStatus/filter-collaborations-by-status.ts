import { NotFoundException } from '@nestjs/common';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { FilterCollaborationByStatusDTO } from '@collaborations/dto/filter-collaboration-by-status.dto';

export class FilterByAcademyAndStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    status,
    academy_id,
  }: FilterCollaborationByStatusDTO): Promise<Collaboration[]> {
    const pendingCollaborations =
      await this.collaborationsRepository.filterByAcademyAndStatus({
        status,
        academy_id,
      });

    if (!pendingCollaborations?.length)
      throw new NotFoundException('No collaborations were found');

    return pendingCollaborations;
  }
}
