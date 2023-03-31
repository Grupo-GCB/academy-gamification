import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Status } from '@shared/constants';
import {
  FilterByStatusDTO,
  FilterByUserAndResponsibleDTO,
  FilterTransactionsByUserDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';

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

  async filterByUserAndResponsible({
    user,
    responsible,
  }: FilterByUserAndResponsibleDTO): Promise<Transaction> {
    return this.transactionsRepository.findOne({
      where: { user, responsible, status: Status.PENDING },
    });
  }
}
