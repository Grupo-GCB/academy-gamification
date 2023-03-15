import {
  Academys,
  BusinessUnits,
  RedeemSubType,
  Status,
  Types,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { FindById } from './find-by-id';

describe('Find a transaction by id', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let sut: FindById;

  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new FindById(inMemoryTransactionsRepository);
  });

  it('shoud be able to find a transaction by id', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      business_unit: BusinessUnits.ADIANTE,
      type: Types.COLLABORATION,
      type: RedeemSubType.PEERCREDIT,
      status: Status.APPROVED,
      gcbits: 5000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      user: 'thiago.ribeiro@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      business_unit: BusinessUnits.PEERBR,
      type: Types.REDEEM,
      type: RedeemSubType.ACADEMY,
      status: Status.PENDING,
      gcbits: 5000,
    });

    const transactionFound = await sut.execute(transaction.id);

    expect(transactionFound).not.toEqual(transaction2);
    expect(transactionFound).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        business_unit: transaction.business_unit,
        type: transaction.type,
        type: transaction.type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('shoud not be able to find a nonexisent transaction', async () => {
    await expect(async () => {
      await sut.execute('793139f0-7dcd-470e-a868-88196d8ac20b');
    }).rejects.toThrow('Transaction does not exist');
  });
});
