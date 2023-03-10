import { CreateCollaboratorDto } from '@collaborator/dto';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';
import { IWalletsRepository } from '@collaborator/interfaces';
import { ICollaboratorsRepository } from '@collaborator/interfaces/ICollaboratorRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterCollaborator {
  constructor(
    private collaboratorRepository: ICollaboratorsRepository,
    private walletsRepository: IWalletsRepository,
  ) {}

  async execute(data: CreateCollaboratorDto): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.create(data);
    const walletData = {
      collaborator_id: collaborator.id,
      gcbits: 0,
    };
    this.walletsRepository.create(walletData);

    return collaborator;
  }
}
