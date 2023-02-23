import { Academy } from './../../infra/typeorm/entities/academy.entity';
import { IAcademysRepository } from 'src/academys/interfaces/IAcademysRepository';
import { NotFoundException, Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdUseCase {
  constructor(private academysRepository: IAcademysRepository) {}

  async execute(id: string): Promise<Academy> {
    const academy = this.academysRepository.findById(id);

    if (!academy) {
      throw new NotFoundException('Academy does not exist');
    }

    return academy;
  }
}
