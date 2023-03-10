import { RegisterCollaboratorDTO } from '@collaborator/dto';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';

export abstract class ICollaboratorsRepository {
  abstract create(data: RegisterCollaboratorDTO): Promise<Collaborator>;

  abstract findOne(id: string): Promise<Collaborator>;
}
