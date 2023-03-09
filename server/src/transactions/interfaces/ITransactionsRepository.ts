import { RegisterTransactionDTO, UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

export abstract class ITransactionsRepository {
  abstract register(data: RegisterTransactionDTO): Promise<Transaction>;

  abstract findOne(id: string): Promise<Transaction>;

  abstract updateStatus({
    id,
    newStatus,
  }: UpdateStatusDTO): Promise<Transaction>;
}
