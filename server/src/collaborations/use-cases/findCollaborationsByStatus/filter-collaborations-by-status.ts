import { BadRequestException, Injectable } from '@nestjs/common';

import { FilterCollaborationsByStatusDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

@Injectable()
export class FilterByStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    status,
  }: FilterCollaborationsByStatusDTO): Promise<Collaboration[]> {
    if (!status) throw new BadRequestException('Status is required');

    const collaborations: Collaboration[] =
      await this.collaborationsRepository.filterByStatus({ status });

    return collaborations;
  }
}
