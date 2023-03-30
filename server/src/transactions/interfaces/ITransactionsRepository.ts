import { CollaborationsSubType } from '@shared/constants';
import {
  FilterTransactionsByStatusDTO,
  FilterTransactionsByUserDTO,
  RegisterTransactionDTO,
  UpdateStatusDTO,
  FindLatestTransactionByUserAndSubTypeDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';

export abstract class ITransactionsRepository {
  abstract register(data: RegisterTransactionDTO): Promise<Transaction>;

  abstract findById(id: string): Promise<Transaction>;

  abstract updateStatus({
    id,
    new_status,
  }: UpdateStatusDTO): Promise<Transaction>;

  abstract filterByStatus({
    status,
  }: FilterTransactionsByStatusDTO): Promise<Transaction[]>;

  abstract findAll(): Promise<Transaction[]>;

  abstract filterByUser({
    user,
  }: FilterTransactionsByUserDTO): Promise<Transaction[]>;

  abstract findLatestTransactionByUserAndSubType({
    user,
    subType,
  }: FindLatestTransactionByUserAndSubTypeDTO): Promise<Transaction>;
}
