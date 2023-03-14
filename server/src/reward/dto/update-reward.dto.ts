import { IsNotEmpty, IsUUID } from 'class-validator';

import { UpdatableRewardDataDTO } from '@reward/dto';

export class UpdateRewardDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  data: UpdatableRewardDataDTO;
}
