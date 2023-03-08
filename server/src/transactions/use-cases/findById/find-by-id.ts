import { Injectable, NotFoundException } from '@nestjs/common';

import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class FindById {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(transaction_id: string): Promise<Transaction> {
    const transaction: Transaction = await this.transactionsRepository.findOne(
      transaction_id,
    );

    if (!transaction) throw new NotFoundException('Transaction does not exist');

    return transaction;
  }
}
