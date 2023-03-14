import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateRewardDTO } from '@reward/dto';
import { Reward } from '@reward/infra/entities/reward.entity';
import { IUpdateRewardRequest } from '@reward/interfaces';
import {
  CreateReward,
  DeleteReward,
  FindOne,
  ListAllRewards,
  UpdateReward,
} from '@reward/use-cases';

@ApiTags('rewards')
@Controller('rewards')
export class RewardsController {
  constructor(
    private createReward: CreateReward,
    private listAllRewards: ListAllRewards,
    private findOneReward: FindOne,
    private updateReward: UpdateReward,
    private deleteReward: DeleteReward,
  ) {}

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

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar recompensas',
  })
  @Get()
  listAll(): Promise<Reward[]> {
    return this.listAllRewards.execute();
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar a recompensa',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reward> {
    return this.findOneReward.execute(id);
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Recompensa alterada com sucesso!',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível alterar a recompensa!',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: IUpdateRewardRequest,
  ): Promise<Reward> {
    return this.updateReward.execute(id, data);
  }

  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Médico deletado com sucesso!',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Não foi possível encontrar o médico!',
  })
  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteReward.execute(id);
  }
}
