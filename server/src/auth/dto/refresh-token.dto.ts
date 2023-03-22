import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsEmail()
  user: string;

  @IsNotEmpty()
  @IsDate()
  expiresAt: number;
}
