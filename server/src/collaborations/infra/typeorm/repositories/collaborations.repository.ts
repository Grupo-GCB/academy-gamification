import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CollaborationsStatus } from '@shared/constants';

@Injectable()
export class CollaborationsRepository {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationsRepository: Repository<Collaboration>,
  ) {}

  async filterByStatus(status: CollaborationsStatus): Promise<Collaboration[]> {
    const collaborations = await this.collaborationsRepository.find({
      where: { status },
    });

    return collaborations;
  }
}
