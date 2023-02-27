import { ApiProperty } from '@nestjs/swagger';
import { CollaborationsStatus } from '@shared/constants';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ICreateCollaborationRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '7313d5eb-fcfe-4380-aa57-2060f28d9f0b',
    description: 'Id do tipo da colaboração',
    type: 'string',
    required: true,
  })
  collaboration_type_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '3a2fd072-96f2-4a3d-82d6-eb64d8ba7c24',
    description: 'Id do colaborador',
    type: 'string',
    required: true,
  })
  collaborator_id: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: '8b57b98e-c1e5-455e-b81d-6f0bee217726',
    description: 'Id(s) do(s) academys',
    type: 'string[]',
    required: true,
  })
  academy_id: string[];

  @IsNotEmpty()
  @IsEnum(CollaborationsStatus)
  @ApiProperty({
    example: '84fed789-731f-4cec-a105-9e0daba127a5',
    description: 'status da colaboração (Aproved, Rejected, Pending)',
    type: 'string',
    required: true,
  })
  status: CollaborationsStatus;
}
