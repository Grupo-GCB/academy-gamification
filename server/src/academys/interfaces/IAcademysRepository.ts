import { Academy } from './../infra/typeorm/entities/academy.entity';
export abstract class IAcademysRepository {
  abstract findById(id: string): Promise<Academy>;
}
