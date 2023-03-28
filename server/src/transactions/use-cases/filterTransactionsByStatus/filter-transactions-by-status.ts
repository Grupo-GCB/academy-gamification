import { BadRequestException, Injectable } from '@nestjs/common';

import { FilterTransactionsByStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';

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
