import { PartialType } from '@nestjs/mapped-types';
import { CreateCollaboratorDto } from './register-collaborator.dto';

export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {}
