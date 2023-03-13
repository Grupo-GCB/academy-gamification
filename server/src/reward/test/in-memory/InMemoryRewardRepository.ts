import { CreateRewardDTO } from '@reward/dto';
import { Reward } from '@reward/infra/entities/reward.entity';
import { IRewardsRepository } from '@reward/interfaces';

export class InMemoryRewardsRepository implements IRewardsRepository {
  rewards: Reward[] = [];
  async create(data: CreateRewardDTO): Promise<Reward> {
    const reward: Reward = Object.assign(new Reward(), data);

    this.rewards.push(reward);

    return reward;
  }
}
