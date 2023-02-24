import { RegisterAcademyDto } from '@academys/dto/create-academy.dto';
import { Academy } from '@academys/infra/typeorm/entities/academy.entity';

export abstract class IAcademysRepository {
  abstract create(data: RegisterAcademyDto): Promise<Academy>;

  abstract findById(id: string): Promise<Academy>;
}
