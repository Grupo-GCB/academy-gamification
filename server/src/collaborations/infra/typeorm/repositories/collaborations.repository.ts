import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { FindCollaborationsByStatusDTO } from '@collaborations/dto/find-collaborations-by-status';

@Injectable()
export class CollaborationsRepository {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationsRepository: Repository<Collaboration>,
  ) {}

  async filterByStatus({
    status,
  }: FindCollaborationsByStatusDTO): Promise<Collaboration[]> {
    const collaborations: Collaboration[] =
      await this.collaborationsRepository.find({
        where: { status },
      });

    return collaborations;
  }
}
