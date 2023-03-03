import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  FindCollaborationsByStatusDTO,
  RegisterCollaborationDTO,
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
}
