import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { CollaborationsSubType } from '@shared/constants';

export class FindLatestTransactionByUserAndSubTypeDTO {
  @IsNotEmpty({ message: 'Insira o e-mail do colaborador!' })
  @IsUUID(undefined, { message: 'Id inválido!' })
  user: string;

  @IsNotEmpty({ message: 'Insira um subtipo!' })
  @IsEnum(CollaborationsSubType, {
    message:
      'O subtipo deve ser um dos seguintes valores: LOGIC_EXERCISE, CODE_REVIEW, COMMITTEE, DOUBTS, PAIR_PROGRAMMING, FEEDBACK, TEAM_CEREMONY!',
  })
  subType: CollaborationsSubType;
}
