import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CreateCollaborationDTO } from '@collaborations/dto/create-collaboration.dto';
import { FilterCollaborationByStatusDTO } from '@collaborations/dto/filter-collaboration-by-status.dto';

export abstract class ICollaborationsRepository {
  abstract create(data: CreateCollaborationDTO): Promise<Collaboration>;

  abstract filterByAcademyAndStatus({
    status,
    academy_id,
  }: FilterCollaborationByStatusDTO): Promise<Collaboration[]>;
}
