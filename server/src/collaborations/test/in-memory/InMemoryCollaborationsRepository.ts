import { RegisterCollaborationDTO } from '@collaborations/dto/register-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { CollaborationsStatus } from '@shared/constants';

export class InMemoryCollaborationsRepository
  implements ICollaborationsRepository
{
  collaborations: Collaboration[] = [];

  async register(data: RegisterCollaborationDTO): Promise<Collaboration> {
    const collaboration = Object.assign(new Collaboration(), data);

    this.collaborations.push(collaboration);

    return collaboration;
  }

  async findByStatus(status: string): Promise<Collaboration[]> {
    const collaborations = this.collaborations.filter(
      (collaboration) => collaboration.status === status,
    );

    return collaborations;
  }
}
