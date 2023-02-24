import { FilterCollaborationByStatusDto } from '@collaborations/dto/filter-collaboration-by-status.dto';
import { RegisterCollaborationDto } from '@collaborations/dto/register-collaboration.dto';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

export abstract class ICollaborationsRepository {
  abstract register(data: RegisterCollaborationDto): Promise<Collaboration>;

  abstract filterCollaborationsByStatus({
    status,
    id,
  }: FilterCollaborationByStatusDto): Promise<Collaboration[]>;
}
