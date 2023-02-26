import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
@Injectable()
export class AcademysRepository {
  constructor(
    @InjectRepository(Academy)
    private academysRepository: Repository<Academy>,
  ) {}

  async findById(id: string): Promise<Academy> {
    return this.academysRepository.findOne({ where: { id } });
  }
}
