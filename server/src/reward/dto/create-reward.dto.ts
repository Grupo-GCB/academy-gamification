import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateRewardDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
