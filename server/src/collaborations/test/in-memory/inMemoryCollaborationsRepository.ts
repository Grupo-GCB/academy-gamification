import { FilterCollaborationByStatusDto } from '@collaborations/dto/filter-collaboration-by-status.dto';
import { RegisterCollaborationDto } from '@collaborations/dto/register-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

export class InMemoryCollaborationsRepository
  implements ICollaborationsRepository
{
  collaborations: Collaboration[] = [];

  async register(data: RegisterCollaborationDto): Promise<Collaboration> {
    const collaboration = new Collaboration();

    Object.assign(collaboration, data);

    this.collaborations.push(collaboration);

    return collaboration;
  }
  async filterCollaborationsByStatus({
    status,
    id,
  }: FilterCollaborationByStatusDto): Promise<Collaboration[]> {
    const academyCollaborations = this.collaborations.filter(
      (collaboration) => collaboration.academy_id === id,
    );

    return academyCollaborations.filter(
      (collaboration) => collaboration.status === status,
    );
  }
}
