import { NotFoundException } from '@nestjs/common';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { FilterByAcademyAndStatusDTO } from '@collaborations/dto/filter-by-academy-and-status';

export class FilterByAcademyAndStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    status,
    academy_id,
  }: FilterByAcademyAndStatusDTO): Promise<Collaboration[]> {
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
