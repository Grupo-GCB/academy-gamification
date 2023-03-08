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

  async execute({
    transaction_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Transaction> {
    if (!newStatus) throw new BadRequestException('newStatus is required');

    const transaction: Transaction = await this.transactionsRepository.findOne(
      transaction_id,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.transactionsRepository.updateStatus({
      transaction_id,
      newStatus,
    });
  }
}
