import { CreateCollaborationDto } from './../../dto/create-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { FilterCollaborationByStatusDto } from '@collaborations/dto/filter-collaboration-by-status.dto';

export class InMemoryCollaborationsRepository
  implements ICollaborationsRepository
{
  collaborations: Collaboration[] = [];

  async create(data: CreateCollaborationDto): Promise<Collaboration> {
    const collaboration = new Collaboration();

    Object.assign(collaboration, data);

    this.collaborations.push(collaboration);

    return collaboration;
  }
  async filterCollaborationsByStatus({
    status,
    academy_id,
  }: FilterCollaborationByStatusDto): Promise<Collaboration[]> {
    const academyCollaborations = this.collaborations.filter(
      (collaboration) => collaboration.academy_id === academy_id,
    );

    return academyCollaborations.filter(
      (collaboration) => collaboration.status === status,
    );
  }
}
