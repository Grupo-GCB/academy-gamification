import { Injectable } from '@nestjs/common';

import { FindLatestTransactionByUserAndSubTypeDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class FindLatestTransactionByUserAndSubType {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({
    user,
    subType,
  }: FindLatestTransactionByUserAndSubTypeDTO): Promise<Transaction> {
    return this.transactionsRepository.findLatestTransactionByUserAndSubType({
      user,
      subType,
    });
  }
}
