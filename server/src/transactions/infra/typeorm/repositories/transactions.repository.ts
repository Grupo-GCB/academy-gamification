import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterTransactionDTO, UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

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

  async findOne(transaction_id: string): Promise<Transaction> {
    return this.transactionsRepository.findOne({
      where: { id: transaction_id },
    });
  }

  async updateStatus({
    transaction_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Transaction> {
    await this.transactionsRepository.update(
      { id: transaction_id },
      { status: newStatus },
    );

    return this.findOne(transaction_id);
  }
}
