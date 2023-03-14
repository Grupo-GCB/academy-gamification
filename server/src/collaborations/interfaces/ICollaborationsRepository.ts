import {
  FilterCollaborationsByStatusDTO,
  RegisterCollaborationDTO,
  UpdateStatusDTO,
} from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

export abstract class ICollaborationsRepository {
  abstract register(data: RegisterCollaborationDTO): Promise<Collaboration>;

  abstract filterByStatus({
    status,
  }: FilterCollaborationsByStatusDTO): Promise<Collaboration[]>;

  abstract findOne(collaborations_id: string): Promise<Collaboration>;

  abstract updateStatus({
    collaboration_id,
    newStatus,
    admin_id,
  }: UpdateStatusDTO): Promise<Collaboration>;
}
