import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
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
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      business_unit: BusinessUnits.ADIANTE,
      reason: TransactionReasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: CollaborationsStatus.APPROVED,
      gcbits: 5000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd802',
      business_unit: BusinessUnits.PEERBR,
      reason: TransactionReasons.REDEEM,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: CollaborationsStatus.PENDING,
      gcbits: 5000,
    });

    const transactionFound = await sut.execute(transaction.id);

    expect(transactionFound).not.toEqual(transaction2);
    expect(transactionFound).toEqual(
      expect.objectContaining({
        id: transaction.id,
        collaborator_id: transaction.collaborator_id,
        business_unit: transaction.business_unit,
        reason: transaction.reason,
        type: transaction.type,
        academys: transaction.academys,
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
