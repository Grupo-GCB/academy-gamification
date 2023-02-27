import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ICreateAcademyRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do Academy',
    type: 'string',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'academy@gcbinvestimentos.com',
    description: 'Email corporativo do Academy',
    type: 'string',
    required: true,
  })
  email: string;
}
