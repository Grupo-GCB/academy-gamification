import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorsController } from '@shared/infra/http/controllers/collaborators.controller';
import { Collaborator } from '@collaborator/infra/entities/collaborator.entity';
import { RegisterCollaborator, UpdateGcbits } from './use-cases';
import { CreateWallet } from './use-cases/createWallet/create-wallet';
import { ICollaboratorsRepository } from './interfaces/ICollaboratorRepository';
import { CollaboratorsRepository } from './infra/repositories/collaborators.repository';
import { IWalletsRepository } from './interfaces';
import { WalletsRepository } from './infra/repositories/wallets.repository';
import { Wallet } from './infra/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator, Wallet])],
  controllers: [CollaboratorsController],
  providers: [
    RegisterCollaborator,
    UpdateGcbits,
    CreateWallet,
    {
      provide: ICollaboratorsRepository,
      useClass: CollaboratorsRepository,
    },
    {
      provide: IWalletsRepository,
      useClass: WalletsRepository,
    },
  ],
})
export class CollaboratorModule {}
