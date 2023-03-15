import {
  Admin,
  CollaborationsSubType,
  RedeemSubType,
  Status,
  Types,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { FindAllTransactions } from './find-all-transactions';

describe('Find all transactions', () => {
  let inMemoryTransactions: InMemoryTransactionsRepository;
  let sut: FindAllTransactions;

  beforeEach(() => {
    inMemoryTransactions = new InMemoryTransactionsRepository();
    sut = new FindAllTransactions(inMemoryTransactions);
  });

  it('should be able to return all transactions', async () => {
    const transactionOne = await inMemoryTransactions.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Admin.ADMIN,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.PENDING,
      gcbits: 5000,
    });

    const transactionTwo = await inMemoryTransactions.register({
      user: 'flavio.marques@gcbinvestimentos.com',
      responsible: Admin.ADMIN,
      type: Types.REDEEM,
      sub_type: RedeemSubType.ACADEMY,
      status: Status.PENDING,
      gcbits: -50000,
    });

    const transactions = await sut.execute();

    expect(transactions).toEqual(
      expect.arrayContaining([transactionOne, transactionTwo]),
    );
  });

  it('should return an empty array', async () => {
    const transactions = await sut.execute();

    expect(transactions).toEqual(expect.arrayContaining([]));
  });
});
