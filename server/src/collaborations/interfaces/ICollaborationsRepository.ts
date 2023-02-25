import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CreateCollaborationDto } from '@collaborations/dto/create-collaboration.dto';
import { FilterCollaborationByStatusDto } from '@collaborations/dto/filter-collaboration-by-status.dto';

export abstract class ICollaborationsRepository {
  abstract create(data: CreateCollaborationDto): Promise<Collaboration>;

  abstract filterCollaborationsByStatus({
    status,
    academy_id,
  }: FilterCollaborationByStatusDto): Promise<Collaboration[]>;
}
