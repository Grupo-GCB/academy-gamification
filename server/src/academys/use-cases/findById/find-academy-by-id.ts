import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { Academy } from '@academys/infra/typeorm/entities/academy.entity';
import { IAcademysRepository } from '@academys/interfaces';

@Injectable()
export class FindByIdUseCase {
  constructor(private academysRepository: IAcademysRepository) {}

  async execute(id: string): Promise<Academy> {
    if (!id) throw new BadRequestException('Id is required');

    const academy = await this.academysRepository.findById(id);

    if (!academy) throw new NotFoundException('Academy does not exist');

    return academy;
  }
}
