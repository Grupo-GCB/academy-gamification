import { IsEnum, IsNotEmpty } from 'class-validator';

import { Roles } from '@shared/constants';

export class FilterUserByRoleDTO {
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
