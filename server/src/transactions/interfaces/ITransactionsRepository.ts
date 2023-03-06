import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

export abstract class ITransactionsRepository {
  abstract register(data: RegisterTransactionDTO): Promise<Transaction>;
}
