import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';
import { RegisterCollaboratorDTO } from '@collaborator/dto';

export class CollaboratorsRepository {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorsRepository: Repository<Collaborator>,
  ) {}

  async create({
    name,
    email,
    password,
  }: RegisterCollaboratorDTO): Promise<Collaborator> {
    const collaborator: Collaborator = this.collaboratorsRepository.create({
      name,
      email,
      password,
    });

    return this.collaboratorsRepository.save(collaborator);
  }
}
