import { RegisterCollaborationDTO } from '@collaborations/dto/register-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

export class InMemoryCollaborationsRepository
  implements ICollaborationsRepository
{
  collaborations: Collaboration[] = [];

  async register(data: RegisterCollaborationDTO): Promise<Collaboration> {
    const collaboration: Collaboration = Object.assign(
      new Collaboration(),
      data,
    );

    this.collaborations.push(collaboration);

    return collaboration;
  }

  async findByStatus(status: string): Promise<Collaboration[]> {
    const collaborations: Collaboration[] = this.collaborations.filter(
      (collaboration) => collaboration.status === status,
    );

    return collaborations;
  }
}
