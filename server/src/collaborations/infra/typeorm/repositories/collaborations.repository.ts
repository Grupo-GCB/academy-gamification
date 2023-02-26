import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CollaborationsStatus } from '@shared/constants';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
@Injectable()
export class CollaborationsRepository {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationsRepository: Repository<Collaboration>,
  ) {}

  async filterByAcademyAndStatus(
    status: CollaborationsStatus,
    academy_id: string,
  ): Promise<Collaboration[]> {
    const academyCollaborations = await this.collaborationsRepository.find({
      where: { academy_id, status },
    });

    return academyCollaborations;
  }
}
