import { BadRequestException, NotFoundException } from '@nestjs/common';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { FilterByAcademyAndStatusDTO } from '@collaborations/dto';
import { IAcademysRepository } from '@academys/interfaces';

export class FilterByAcademyAndStatus {
  constructor(
    private collaborationsRepository: ICollaborationsRepository,
    private academysRepository: IAcademysRepository,
  ) {}

  async execute({
    status,
    academy_id,
  }: FilterByAcademyAndStatusDTO): Promise<Collaboration[]> {
    if (!status || !academy_id)
      throw new BadRequestException('Id and Status are required!');

      const academy = await this.academysRepository.findById(academy_id);

      if (!academy) throw new NotFoundException('Academy not found');

    const pendingCollaborations: Collaboration[] =
      await this.collaborationsRepository.filterByAcademyAndStatus({
        status,
        academy_id,
      });

    if (!pendingCollaborations?.length)
      throw new NotFoundException('No collaborations were found');

    return pendingCollaborations;
  }
}
