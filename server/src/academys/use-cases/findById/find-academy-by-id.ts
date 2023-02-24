import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
import { IAcademysRepository } from '@academys/interfaces';
import { NotFoundException, Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdUseCase {
  constructor(private academysRepository: IAcademysRepository) {}

  async execute(id: string): Promise<Academy> {
    const academy = await this.academysRepository.findById(id);

    if (!academy) {
      throw new NotFoundException('Academy does not exist');
    }

    return academy;
  }
}
