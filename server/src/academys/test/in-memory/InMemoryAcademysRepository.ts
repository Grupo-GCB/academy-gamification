import { CreateAcademyDTO } from '@academys/dto/create-academy.dto';
import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
import { IAcademysRepository } from '@academys/interfaces';

export class InMemoryAcademysRepository implements IAcademysRepository {
  academys: Academy[] = [];

  async create(data: CreateAcademyDTO): Promise<Academy> {
    const academy = new Academy();

    Object.assign(academy, data);

    this.academys.push(academy);

    return academy;
  }

  async findById(id: string): Promise<Academy> {
    return this.academys.find((academy) => academy.id === id);
  }
}
