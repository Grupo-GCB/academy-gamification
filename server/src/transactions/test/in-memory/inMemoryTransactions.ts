import {
  FilterTransactionsByStatusDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces/ITransactionsRepository';

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

  async filterByStatus({
    status,
  }: FilterTransactionsByStatusDTO): Promise<Transaction[]> {
    const transactions: Transaction[] = this.transactions.filter(
      (transaction) => transaction.status === status,
    );

    return transactions;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }
}
