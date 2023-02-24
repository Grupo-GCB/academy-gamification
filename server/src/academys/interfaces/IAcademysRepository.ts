import { CreateAcademyDto } from '@academys/dto/create-academy.dto';
import { Academy } from '@academys/infra/typeorm/entities/academy.entity';

export abstract class IAcademysRepository {
  abstract create(data: CreateAcademyDto): Promise<Academy>;

  abstract findById(id: string): Promise<Academy>;
}
