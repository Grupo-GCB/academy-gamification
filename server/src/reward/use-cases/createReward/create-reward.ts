import { Injectable } from '@nestjs/common';

import { IRewardsRepository } from '@reward/interfaces';
import { CreateRewardDTO } from '@reward/dto';
import { Reward } from '@reward/infra/entities/reward.entity';

@Injectable()
export class CreateReward {
  constructor(private rewardsRepository: IRewardsRepository) {}

  async execute(data: CreateRewardDTO): Promise<Reward> {
    return this.rewardsRepository.create(data);
  }
}
