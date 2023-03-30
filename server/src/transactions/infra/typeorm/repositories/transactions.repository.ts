import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  FilterByStatusDTO,
  FilterTransactionsByUserDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
  FindLatestTransactionByUserAndSubTypeDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import {
  CollaborationsCooldown,
  CollaborationsSubType,
} from '@shared/constants';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async register({
    user,
    responsible,
    type,
    sub_type,
    status,
    gcbits,
    description,
  }: RegisterTransactionDTO): Promise<Transaction> {
    const transaction: Transaction = this.transactionsRepository.create({
      user,
      responsible,
      type,
      sub_type,
      status,
      gcbits,
      description,
    });

    return this.transactionsRepository.save(transaction);
  }

  async findById(id: string): Promise<Transaction> {
    return this.transactionsRepository.findOne({
      where: { id },
    });
  }

  async updateStatus({
    id,
    new_status,
  }: UpdateStatusDTO): Promise<Transaction> {
    await this.transactionsRepository.update({ id }, { status: new_status });

    return this.findById(id);
  }

  async filterByStatus({ status }: FilterByStatusDTO): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { status },
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  async filterByUser({
    user,
  }: FilterTransactionsByUserDTO): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { user },
    });
  }

  async findLatestTransactionByUserAndSubType({
    user,
    subType,
  }: FindLatestTransactionByUserAndSubTypeDTO): Promise<Transaction> {
    const latestTransaction = await this.transactionsRepository.findOne({
      where: {
        user: user,
        sub_type: subType,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return latestTransaction;
  }
}
