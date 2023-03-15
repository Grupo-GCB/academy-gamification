import { Injectable } from '@nestjs/common';

import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class FindAllTransactions {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionsRepository.findAll();
  }
}
