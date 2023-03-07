import { Injectable } from '@nestjs/common';

import { ITransactionsRepository } from '@transactions/interfaces';
import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

@Injectable()
export class RegisterTransaction {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(data: RegisterTransactionDTO): Promise<Transaction> {
    return this.transactionsRepository.register(data);
  }
}
