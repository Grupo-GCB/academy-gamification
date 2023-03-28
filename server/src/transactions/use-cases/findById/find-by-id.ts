import { Injectable, NotFoundException } from '@nestjs/common';

import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class FindById {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(id: string): Promise<Transaction> {
    const transaction: Transaction = await this.transactionsRepository.findById(
      id,
    );

    if (!transaction) throw new NotFoundException('Transaction does not exist');

    return transaction;
  }
}
