import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollaborationsStatus } from '@shared/constants';
import { Repository } from 'typeorm';
import { Collaboration } from '../entities/collaboration.entity';
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
      where: { academy_id },
    });

    return academyCollaborations.filter(
      (collaboration) => collaboration.status === status,
    );
  }
}
