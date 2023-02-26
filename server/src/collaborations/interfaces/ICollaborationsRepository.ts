import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CreateCollaborationDTO } from '@collaborations/dto/create-collaboration.dto';
import { FilterByAcademyAndStatusDTO } from '@collaborations/dto/filter-by-academy-and-status';

export abstract class ICollaborationsRepository {
  abstract create(data: CreateCollaborationDTO): Promise<Collaboration>;

  abstract filterByAcademyAndStatus({
    status,
    academy_id,
  }: FilterByAcademyAndStatusDTO): Promise<Collaboration[]>;
}
