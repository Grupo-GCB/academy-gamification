import { Injectable, NotFoundException } from '@nestjs/common';

import { Reward } from '@reward/infra/entities/reward.entity';
import { IRewardsRepository, IUpdateRewardRequest } from '@reward/interfaces';

@Injectable()
export class UpdateReward {
  constructor(private rewardsRepository: IRewardsRepository) {}

  async execute(id: string, data: IUpdateRewardRequest): Promise<Reward> {
    const reward: Reward = await this.rewardsRepository.findOne(id);

    if (!reward) throw new NotFoundException('Reward does not exist');

    const keys = Object.keys(data);

    keys.forEach((key) => (reward[key] = data[key]));

    return this.rewardsRepository.update({ id, data });
  }
}
