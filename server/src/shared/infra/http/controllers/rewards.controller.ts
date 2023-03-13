import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateRewardDTO } from '@reward/dto';
import { Reward } from '@reward/infra/entities/reward.entity';

import { CreateReward } from '@reward/use-cases';

@Controller('rewards')
export class RewardsController {
  constructor(private createReward: CreateReward) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Recompensa criada com sucesso',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Falha ao criar uma recompensa',
  })
  @Post()
  create(@Body() data: CreateRewardDTO): Promise<Reward> {
    return this.createReward.execute(data);
  }
}
