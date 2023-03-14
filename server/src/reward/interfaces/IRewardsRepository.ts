import { CreateRewardDTO } from '@reward/dto';
import { Reward } from '@reward/infra/entities/reward.entity';

export abstract class IRewardsRepository {
  abstract create(data: CreateRewardDTO): Promise<Reward>;

  abstract listAll(): Promise<Reward[]>;
}
