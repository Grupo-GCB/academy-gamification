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

  async listAll(): Promise<Reward[]> {
    const orderedRewards: Reward[] = this.rewards.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return orderedRewards;
  }

  async findOne(id: string): Promise<Reward> {
    return this.rewards.find((reward) => reward.id === id);
  }
}
