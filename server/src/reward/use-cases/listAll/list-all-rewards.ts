import { Injectable } from '@nestjs/common';
import { Reward } from '@reward/infra/entities/reward.entity';
import { IRewardsRepository } from '@reward/interfaces';
@Injectable()
export class ListAllRewards {
  constructor(private rewardsRepository: IRewardsRepository) {}

  async execute(): Promise<Reward[]> {
    return this.rewardsRepository.listAll();
  }
}
