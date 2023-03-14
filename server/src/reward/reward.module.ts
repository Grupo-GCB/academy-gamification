import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RewardsRepository } from '@reward/infra/repositories/rewards.repository';
import { IRewardsRepository } from '@reward/interfaces';
import { CreateReward, FindOne, ListAllRewards } from '@reward/use-cases';
import { Reward } from '@reward/infra/entities/reward.entity';
import { RewardsController } from '@shared/infra/http/controllers/rewards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardsController],
  providers: [
    CreateReward,
    ListAllRewards,
    FindOne,
    {
      provide: IRewardsRepository,
      useClass: RewardsRepository,
    },
  ],
})
export class RewardsModule {}
