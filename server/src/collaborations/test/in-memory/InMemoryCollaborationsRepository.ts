import {
  FilterCollaborationsByStatusDTO,
  RegisterCollaborationDTO,
  UpdateStatusDTO,
} from '@collaborations/dto';
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

  async findOne(collaboration_id: string): Promise<Collaboration> {
    return this.collaborations.find(
      (collaboration) => collaboration.id === collaboration_id,
    );
  }

  async filterByStatus({
    status,
  }: FilterCollaborationsByStatusDTO): Promise<Collaboration[]> {
    const collaborations: Collaboration[] = this.collaborations.filter(
      (collaboration) => collaboration.status === status,
    );

    return collaborations;
  }

  async updateStatus({
    collaboration_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Collaboration> {
    const collaboration = await this.findOne(collaboration_id);

    collaboration.status = newStatus;

    return collaboration;
  }
}
