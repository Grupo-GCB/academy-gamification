import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Reward } from '@reward/infra/entities/reward.entity';
import { CreateRewardDTO } from '@reward/dto';

@Injectable()
export class RewardsRepository {
  constructor(
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
  ) {}

  async create({ name, description, value, imageUrl }: CreateRewardDTO) {
    const reward: Reward = this.rewardsRepository.create({
      name,
      description,
      value,
      imageUrl,
    });

    return this.rewardsRepository.save(reward);
  }
}
