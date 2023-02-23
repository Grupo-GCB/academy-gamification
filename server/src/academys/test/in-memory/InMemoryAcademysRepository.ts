import { Academy } from 'src/academys/infra/typeorm/entities/academy.entity';
import { IAcademysRepository } from 'src/academys/interfaces';
export class InMemoryAcademysRepository implements IAcademysRepository {
  academys: Academy[] = [];

  async findById(id: string): Promise<Academy> {
    return this.academys.find((academy) => academy.id === id);
  }
}
