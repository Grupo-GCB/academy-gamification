import { FindLatestTransactionByUserAndSubTypeDTO } from '@transactions/dto';
import { Injectable } from '@nestjs/common';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
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
