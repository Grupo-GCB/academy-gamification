import { RegisterTransactionDTO } from '@transactions/dto';
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
    const transaction: Transaction = this.transactions.find(
      (transaction) => transaction.id === transaction_id,
    );

    return transaction;
  }
}
