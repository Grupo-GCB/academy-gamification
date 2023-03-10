import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';

export class CollaboratorsRepository {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorsRepository: Repository<Collaborator>,
  ) {}
}
