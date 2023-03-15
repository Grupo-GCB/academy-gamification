import {
  Admin,
  BusinessUnits,
  CollaborationsTypes,
  Reasons,
  RedeemTypes,
  Status,
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
      collaborator: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Admin.ADMIN,
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: CollaborationsTypes.CODEREVIEW,
      status: Status.PENDING,
      gcbits: 5000,
    });

    const transactionTwo = await inMemoryTransactions.register({
      collaborator: 'flavio.marques@gcbinvestimentos.com',
      responsible: Admin.ADMIN,
      business_unit: BusinessUnits.PEERBR,
      reason: Reasons.REDEEM,
      type: RedeemTypes.ACADEMY,
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
