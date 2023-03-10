import { RegisterCollaboratorDTO } from '@collaborator/dto';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';
import { ICollaboratorsRepository } from '@collaborator/interfaces/ICollaboratorRepository';

export class InMemoryCollaboratorRepository
  implements ICollaboratorsRepository
{
  collaborators: Collaborator[] = [];

  async create(data: RegisterCollaboratorDTO): Promise<Collaborator> {
    const collaborator: Collaborator = Object.assign(new Collaborator(), data);

    this.collaborators.push(collaborator);

    return collaborator;
  }

  async findOne(id: string): Promise<Collaborator> {
    return this.collaborators.find((collaborator) => collaborator.id === id);
  }
}
