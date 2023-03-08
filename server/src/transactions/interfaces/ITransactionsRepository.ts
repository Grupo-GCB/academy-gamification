import { CollaborationsStatus } from '@shared/constants';
import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

export abstract class ITransactionsRepository {
  abstract register(data: RegisterTransactionDTO): Promise<Transaction>;

  abstract findOne(transaction_id: string): Promise<Transaction>;

  abstract filterByStatus(status: CollaborationsStatus): Promise<Transaction>;
}
