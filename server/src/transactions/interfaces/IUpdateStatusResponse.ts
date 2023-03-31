import { Transaction } from '@transactions/infra/typeorm/entities';

export interface IUpdateStatusResponse {
  transaction: Transaction;
  otherTransaction: Transaction;
}
