import {
  FilterByStatusDTO,
  FilterTransactionsByUserDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
  FindLatestTransactionByUserAndSubTypeDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';

export class InMemoryTransactionsRepository implements ITransactionsRepository {
  transactions: Transaction[] = [];

  async register(data: RegisterTransactionDTO): Promise<Transaction> {
    const transaction: Transaction = Object.assign(new Transaction(), data);

    transaction.created_at = new Date();

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

  async findLatestTransactionByUserAndSubType({
    user,
    subType,
  }: FindLatestTransactionByUserAndSubTypeDTO): Promise<Transaction> {
    const filteredTransactions = this.transactions.filter(
      (transaction) =>
        transaction.user === user && transaction.sub_type === subType,
    );

    if (filteredTransactions.length === 0) {
      return null;
    }

    filteredTransactions.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );

    return filteredTransactions[0];
  }
}
