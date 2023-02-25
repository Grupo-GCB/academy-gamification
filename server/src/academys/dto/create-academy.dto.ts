import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAcademyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
