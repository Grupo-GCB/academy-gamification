import { CollaborationsStatus } from '@shared/constants';
import { RegisterCollaborationDTO } from '@collaborations/dto/register-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

export abstract class ICollaborationsRepository {
  abstract register(data: RegisterCollaborationDTO): Promise<Collaboration>;

  abstract findByStatus(status: CollaborationsStatus): Promise<Collaboration[]>;
}
