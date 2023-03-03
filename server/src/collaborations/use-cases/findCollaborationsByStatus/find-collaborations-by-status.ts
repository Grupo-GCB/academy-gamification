import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FindCollaborationsByStatusDTO } from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

@Injectable()
export class FindByStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    status,
  }: FindCollaborationsByStatusDTO): Promise<Collaboration[]> {
    if (!status) throw new BadRequestException('Status is required');

    const collaborations: Collaboration[] =
      await this.collaborationsRepository.findByStatus({ status });

    if (collaborations.length === 0)
      throw new NotFoundException('No collaborations found');

    return collaborations;
  }
}
