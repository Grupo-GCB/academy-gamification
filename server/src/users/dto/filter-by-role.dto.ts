import { IsEnum, IsNotEmpty } from 'class-validator';

import { Roles } from '@shared/constants';

export class FilterUserByRoleDTO {
  @IsNotEmpty({ message: 'Insira um cargo!' })
  @IsEnum(Roles, {
    message:
      'O cargo deve ser um dos seguintes valores: COLLABORATOR, ACADEMY ou ADMIN!',
  })
  role: Roles;
}
