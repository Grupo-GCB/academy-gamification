import { CreateCollaborationDTO } from './../../dto/create-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';
import { FilterCollaborationByStatusDTO } from '@collaborations/dto/filter-collaboration-by-status.dto';

export class InMemoryCollaborationsRepository
  implements ICollaborationsRepository
{
  collaborations: Collaboration[] = [];

  async create(data: CreateCollaborationDTO): Promise<Collaboration> {
    const collaboration = new Collaboration();

    Object.assign(collaboration, data);

    this.collaborations.push(collaboration);

    return collaboration;
  }
  async filterByAcademyAndStatus({
    status,
    academy_id,
  }: FilterCollaborationByStatusDTO): Promise<Collaboration[]> {
    const academyPendingCollaborations = this.collaborations.filter(
      (collaboration) =>
        collaboration.academy_id.includes(academy_id) &&
        collaboration.status === status,
    );

    return academyPendingCollaborations;
  }
}
