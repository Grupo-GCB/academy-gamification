import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAcademyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
