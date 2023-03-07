import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { RegisterTransactionDTO } from '@transactions/dto';

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
}