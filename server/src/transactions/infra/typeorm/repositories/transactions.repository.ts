import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  RegisterTransactionDTO,
  UpdateStatusDTO,
  FilterTransactionsByStatusDTO,
} from '@transactions/dto';
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

  async findOne(id: string): Promise<Transaction> {
    return this.transactionsRepository.findOne({
      where: { id },
    });
  }

  async updateStatus({ id, newStatus }: UpdateStatusDTO): Promise<Transaction> {
    await this.transactionsRepository.update({ id }, { status: newStatus });

    return this.findOne(id);
  }

  async filterByStatus({
    status,
  }: FilterTransactionsByStatusDTO): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { status },
    });
  }
}
