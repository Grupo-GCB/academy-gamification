import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRewardDTO {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  value?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
