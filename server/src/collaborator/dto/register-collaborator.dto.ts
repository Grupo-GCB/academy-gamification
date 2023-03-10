import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterCollaboratorDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
