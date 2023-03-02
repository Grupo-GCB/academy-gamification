import {
  FindCollaborationsByStatusDTO,
  RegisterCollaborationDTO,
} from '@collaborations/dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

export abstract class ICollaborationsRepository {
  abstract register(data: RegisterCollaborationDTO): Promise<Collaboration>;

  abstract findByStatus({
    status,
  }: FindCollaborationsByStatusDTO): Promise<Collaboration[]>;
}
