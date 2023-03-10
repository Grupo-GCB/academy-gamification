import { PartialType } from '@nestjs/mapped-types';
import { RegisterCollaboratorDTO } from './register-collaborator.dto';

export class UpdateCollaboratorDto extends PartialType(
  RegisterCollaboratorDTO,
) {}
