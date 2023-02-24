import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Collaboration,
  CollaborationsStatus,
} from '../entities/collaboration.entity';
@Injectable()
export class CollaborationsRepository {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationsRepository: Repository<Collaboration>,
  ) {}

  async filterByStatus(
    status: CollaborationsStatus,
    id: string,
  ): Promise<Collaboration[]> {
    const academyCollaborations = await this.collaborationsRepository.find({
      where: { id },
    });

    return academyCollaborations.filter(
      (collaboration) => collaboration.status === status,
    );
  }
}
