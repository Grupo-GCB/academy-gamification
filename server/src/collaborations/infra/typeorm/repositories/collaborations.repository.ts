import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

@Injectable()
export class CollaborationsRepository {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationsRepository: Repository<Collaboration>,
  ) {}

  async filterByStatus(status: string): Promise<Collaboration[]> {
    const collaborations: Collaboration[] =
      await this.collaborationsRepository.find({
        where: { status },
      });

    return collaborations;
  }
}
