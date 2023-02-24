import { IsNotEmpty, IsString } from 'class-validator';

export class DoubtsSolvedDTO {
  @IsNotEmpty()
  @IsString()
  collaborator: string;

  @IsNotEmpty()
  @IsString()
  academyHelped: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
