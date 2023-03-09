import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class UpdateStatus {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({ id, newStatus }: UpdateStatusDTO): Promise<Transaction> {
    if (!newStatus) throw new BadRequestException('newStatus is required');
    if (!id) throw new BadRequestException('id is required');

    const transaction: Transaction = await this.transactionsRepository.findOne(
      id,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.transactionsRepository.updateStatus({
      id,
      newStatus,
    });
  }
}
