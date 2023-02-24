import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAcademyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
