import {
  FilterTransactionsByStatusDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

export abstract class ITransactionsRepository {
  abstract register(data: RegisterTransactionDTO): Promise<Transaction>;

  abstract findOne(id: string): Promise<Transaction>;

  abstract updateStatus({
    id,
    new_status,
  }: UpdateStatusDTO): Promise<Transaction>;

  abstract filterByStatus({
    status,
  }: FilterTransactionsByStatusDTO): Promise<Transaction[]>;

  abstract findAll(): Promise<Transaction[]>;
}
