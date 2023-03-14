import { Injectable } from '@nestjs/common';
import { Reward } from '@reward/infra/entities/reward.entity';
import { IRewardsRepository } from '@reward/interfaces';
@Injectable()
export class ListAllRewards {
  constructor(private rewardsRepository: IRewardsRepository) {}

  async execute(): Promise<Reward[]> {
    const rewards: Reward[] = await this.rewardsRepository.listAll();

    return rewards.sort((a, b) => a.name.localeCompare(b.name));
  }
}
