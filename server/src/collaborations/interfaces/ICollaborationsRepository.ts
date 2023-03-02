import { FindCollaborationsByStatusDTO } from '@collaborations/dto/find-collaborations-by-status';
import { RegisterCollaborationDTO } from '@collaborations/dto/register-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

export abstract class ICollaborationsRepository {
  abstract register(data: RegisterCollaborationDTO): Promise<Collaboration>;

  abstract findByStatus({
    status,
  }: FindCollaborationsByStatusDTO): Promise<Collaboration[]>;
}
