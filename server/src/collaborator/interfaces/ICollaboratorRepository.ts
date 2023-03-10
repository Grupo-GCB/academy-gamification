import { CreateCollaboratorDto } from '@collaborator/dto';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';

export abstract class ICollaboratorsRepository {
  abstract create(data: CreateCollaboratorDto): Promise<Collaborator>;

  abstract findOne(id: string): Promise<Collaborator>;
}
