import { IsNotEmpty, IsString } from 'class-validator';

export class TeamCeremonyDTO {
  @IsNotEmpty()
  @IsString()
  collaborator: string;

  @IsNotEmpty()
  @IsString()
  ceremonyType: string;

  @IsNotEmpty()
  @IsString()
  teamHost: string;

  @IsNotEmpty()
  @IsString()
  academyInvited: string;
}
