import { PartialType } from '@nestjs/mapped-types';
import { RegisterAcademyDto } from './create-academy.dto';

export class UpdateAcademyDto extends PartialType(RegisterAcademyDto) {}
