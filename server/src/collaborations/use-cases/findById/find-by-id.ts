import { Injectable, NotFoundException } from '@nestjs/common';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

@Injectable()
export class FindById {
  constructor(private collaborationsRepository: ICollaborationsRepository) {}

  async execute(collaboration_id: string): Promise<Collaboration> {
    const collaboration: Collaboration =
      await this.collaborationsRepository.findOne(collaboration_id);

    if (!collaboration)
      throw new NotFoundException('Collaborations does not exist');

    return collaboration;
  }
}
