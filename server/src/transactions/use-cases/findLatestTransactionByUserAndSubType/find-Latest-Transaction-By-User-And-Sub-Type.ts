import { Injectable } from '@nestjs/common';
import { CollaborationsSubType } from '@shared/constants';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class FindLatestTransactionByUserAndSubType {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(
    user: string,
    subType: CollaborationsSubType,
  ): Promise<Transaction> {
    return this.transactionsRepository.findLatestTransactionByUserAndSubType(
      user,
      subType,
    );
  }
}
