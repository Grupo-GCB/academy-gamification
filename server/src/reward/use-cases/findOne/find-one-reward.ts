import { Injectable, NotFoundException } from '@nestjs/common';

import { Reward } from '@reward/infra/entities/reward.entity';
import { IRewardsRepository } from '@reward/interfaces';

@Injectable()
export class FindOne {
  constructor(private rewardsRepository: IRewardsRepository) {}

  async execute(id: string): Promise<Reward> {
    const reward: Reward = await this.rewardsRepository.findOne(id);

    if (!reward) throw new NotFoundException('Reward does not exist');

    return reward;
  }
}
