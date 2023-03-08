import { Injectable, BadRequestException } from '@nestjs/common';

import { ITransactionsRepository } from '@transactions/interfaces';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { FilterTransactionsByStatusDTO } from '@transactions/dto';

@Injectable()
export class FilterTransactionsByStatus {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({
    status,
  }: FilterTransactionsByStatusDTO): Promise<Transaction[]> {
    if (!status) throw new BadRequestException('Status is required');

    const transactions: Transaction[] =
      await this.transactionsRepository.filterByStatus({ status });

    return transactions;
  }
}
