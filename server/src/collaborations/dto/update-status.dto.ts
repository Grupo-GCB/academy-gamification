import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsString()
  collaboration_id: string;

  @IsNotEmpty()
  @IsString()
  newStatus: string;
}
