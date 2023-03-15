import {
  Academys,
  BusinessUnits,
  Reasons,
  RedeemTypes,
  Status,
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
      collaborator: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: RedeemTypes.PEERCREDIT,
      status: Status.APPROVED,
      gcbits: 5000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      collaborator: 'thiago.ribeiro@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      business_unit: BusinessUnits.PEERBR,
      reason: Reasons.REDEEM,
      type: RedeemTypes.ACADEMY,
      status: Status.PENDING,
      gcbits: 5000,
    });

    const transactionFound = await sut.execute(transaction.id);

    expect(transactionFound).not.toEqual(transaction2);
    expect(transactionFound).toEqual(
      expect.objectContaining({
        id: transaction.id,
        collaborator: transaction.collaborator,
        business_unit: transaction.business_unit,
        reason: transaction.reason,
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
