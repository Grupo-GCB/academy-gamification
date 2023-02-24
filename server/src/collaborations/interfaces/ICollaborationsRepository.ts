import { CollaborationsStatus } from './../infra/typeorm/entities/collaboration.entity';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { CreateCollaborationDto } from '@collaborations/dto/create-collaboration.dto';

export abstract class ICollaborationsRepository {
  abstract create(data: CreateCollaborationDto): Promise<Collaboration>;

  abstract filterCollaborationsByStatus(
    status: CollaborationsStatus,
    id: string,
  ): Promise<Collaboration[]>;
}
