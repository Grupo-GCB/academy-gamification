import { RegisterCollaborationDto } from '@collaborations/dto/register-collaboration.dto';
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

  async register({
    collaboration_type_id,
    collaborator_id,
    academy_id,
  }: RegisterCollaborationDto): Promise<Collaboration> {
    const collaboration = this.collaborationsRepository.create({
      collaboration_type_id,
      collaborator_id,
      academy_id,
    });

    await this.collaborationsRepository.save(collaboration);

    return collaboration;
  }

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
