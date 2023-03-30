import { BadRequestException, Injectable } from '@nestjs/common';

import { FilterByStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class FilterByStatus {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({ status }: FilterByStatusDTO): Promise<Transaction[]> {
    if (!status) throw new BadRequestException('Status é exigido!');

    const transactions: Transaction[] =
      await this.transactionsRepository.filterByStatus({ status });

    return transactions;
  }
}
