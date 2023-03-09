import {
  FilterCollaborationsByStatusDTO,
  RegisterCollaborationDTO,
  UpdateStatusDTO,
} from '@collaborations/dto';
import { FilterCollaborationByStatusDto } from '@collaborations/dto/filter-collaboration-by-status.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { ICollaborationsRepository } from '@collaborations/interfaces';

export class InMemoryCollaborationsRepository
  implements ICollaborationsRepository
{
  register(data: RegisterCollaborationDTO): Promise<Collaboration> {
    throw new Error('Method not implemented.');
  }
  filterByStatus({
    status,
  }: FilterCollaborationsByStatusDTO): Promise<Collaboration[]> {
    throw new Error('Method not implemented.');
  }
  findOne(collaborations_id: string): Promise<Collaboration> {
    throw new Error('Method not implemented.');
  }
  updateStatus({
    collaboration_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Collaboration> {
    throw new Error('Method not implemented.');
  }
  collaborations: Collaboration[] = [];

  async create(data: RegisterCollaborationDTO): Promise<Collaboration> {
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
