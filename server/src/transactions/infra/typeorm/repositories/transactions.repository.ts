import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import {
  FilterTransactionsByStatusDTO,
  RegisterTransactionDTO,
} from '@transactions/dto';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async register({
    collaborator_id,
    business_unit,
    reason,
    type,
    academys,
    status,
    gcbits,
  }: RegisterTransactionDTO): Promise<Transaction> {
    const transaction: Transaction = await this.transactionsRepository.create({
      collaborator_id,
      business_unit,
      reason,
      type,
      academys,
      status,
      gcbits,
    });

    return this.transactionsRepository.save(transaction);
  }

  async filterByStatus({
    status,
  }: FilterTransactionsByStatusDTO): Promise<Transaction[]> {
    const transactions: Transaction[] = await this.transactionsRepository.find({
      where: { status },
    });

    return transactions;
  }
}
