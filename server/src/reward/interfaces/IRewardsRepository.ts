import { CreateRewardDTO, UpdateRewardDTO } from '@reward/dto';
import { Reward } from '@reward/infra/entities/reward.entity';

export abstract class IRewardsRepository {
  abstract create(data: CreateRewardDTO): Promise<Reward>;

  abstract listAll(): Promise<Reward[]>;

  abstract findOne(id: string): Promise<Reward>;

  abstract update({ id, data }: UpdateRewardDTO): Promise<Reward>;

  abstract delete(id: string): Promise<void>;
}
