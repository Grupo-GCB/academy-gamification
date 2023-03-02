import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { FindCollaborationsByStatusDTO } from '@collaborations/dto';

@Injectable()
export class FindByStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute({
    status,
  }: FindCollaborationsByStatusDTO): Promise<Collaboration[]> {
    if (!status) throw new BadRequestException('Status is required');

    const collaborations: Collaboration[] =
      await this.collaborationsRepository.findByStatus({ status });

    if (!collaborations?.length)
      throw new NotFoundException('No collaborations found');

    return collaborations;
  }
}
