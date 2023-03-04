import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  FindCollaborationsByStatusDTO,
  RegisterCollaborationDTO,
  UpdateStatusDTO,
} from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

@Injectable()
export class CollaborationsRepository {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationsRepository: Repository<Collaboration>,
  ) {}

  async register({
    type,
    url,
    collaborator_id,
    businessUnit,
    status,
  }: RegisterCollaborationDTO): Promise<Collaboration> {
    const collaboration: Collaboration = this.collaborationsRepository.create({
      type,
      url,
      collaborator_id,
      businessUnit,
      status,
    });

    console.log('repo', {
      type,
      url,
      collaborator_id,
      businessUnit,
      status,
    });

    return this.collaborationsRepository.save(collaboration);
  }

  async filterByStatus({
    status,
  }: FindCollaborationsByStatusDTO): Promise<Collaboration[]> {
    const collaborations: Collaboration[] =
      await this.collaborationsRepository.find({
        where: { status },
      });

    return collaborations;
  }

  async findOne(collaboration_id: string): Promise<Collaboration> {
    return this.collaborationsRepository.findOne({
      where: { id: collaboration_id },
    });
  }

  async updateStatus({
    collaboration_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Collaboration> {
    await this.collaborationsRepository.update(
      { id: collaboration_id },
      { status: newStatus },
    );

    return this.findOne(collaboration_id);
  }
}
