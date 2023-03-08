import { RegisterTransactionDTO, UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces/ITransactionsRepository';

export class InMemoryTransactionsRepository implements ITransactionsRepository {
  transactions: Transaction[] = [];

  async register(data: RegisterTransactionDTO): Promise<Transaction> {
    const transaction: Transaction = Object.assign(new Transaction(), data);

    this.transactions.push(transaction);

    return transaction;
  }

  async findOne(transaction_id: string): Promise<Transaction> {
    return this.transactions.find(
      (transaction) => transaction.id === transaction_id,
    );
  }

  async updateStatus({
    transaction_id,
    newStatus,
  }: UpdateStatusDTO): Promise<Transaction> {
    const transaction = await this.findOne(transaction_id);

    transaction.status = newStatus;

    return transaction;
  }
}
