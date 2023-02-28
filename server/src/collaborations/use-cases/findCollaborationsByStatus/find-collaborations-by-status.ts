import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { ICollaborationsRepository } from '@collaborations/interfaces';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CollaborationsStatus } from '@shared/constants';

@Injectable()
export class FindByStatus {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute(status: CollaborationsStatus): Promise<Collaboration[]> {
    if (!status) throw new BadRequestException('Status is required');

    const collaborations: Collaboration[] =
      await this.collaborationsRepository.findByStatus(
        CollaborationsStatus.PENDING,
      );

    if (!collaborations?.length)
      throw new NotFoundException('No collaborations found');

    return collaborations;
  }
}
