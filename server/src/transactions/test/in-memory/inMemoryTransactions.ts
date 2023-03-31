import {
  FilterByStatusDTO,
  FilterTransactionsByUserDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';

export class InMemoryTransactionsRepository implements ITransactionsRepository {
  transactions: Transaction[] = [];

  async register(data: RegisterTransactionDTO): Promise<Transaction> {
    const transaction: Transaction = Object.assign(new Transaction(), data);

    this.transactions.push(transaction);

    return transaction;
  }

  async findById(id: string): Promise<Transaction> {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  async updateStatus({
    id,
    new_status,
  }: UpdateStatusDTO): Promise<Transaction> {
    const transaction = await this.findById(id);

    transaction.status = new_status;

    return transaction;
  }

  async filterByStatus({ status }: FilterByStatusDTO): Promise<Transaction[]> {
    const transactions: Transaction[] = this.transactions.filter(
      (transaction) => transaction.status === status,
    );

    return transactions;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async filterByUser({
    user,
  }: FilterTransactionsByUserDTO): Promise<Transaction[]> {
    const transactions: Transaction[] = this.transactions.filter(
      (transaction) => transaction.user === user,
    );

    return transactions;
  }

  async filterByUserAndResponsible({
    user,
    responsible,
  }: {
    user: any;
    responsible: any;
  }): Promise<Transaction> {
    const transaction = this.transactions.find(
      (transaction) =>
        transaction.user === responsible && transaction.responsible === user,
    );

    return transaction;
  }
}
