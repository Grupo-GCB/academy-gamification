import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { RegisterTransaction } from '@transactions/use-cases';

describe('Register transaction', () => {
  let inMemoryTransactionRepository: InMemoryTransactionsRepository;
  let sut: RegisterTransaction;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionsRepository();
    sut = new RegisterTransaction(inMemoryTransactionRepository);
  });

  it('Should be able to register a new transaction', async () => {
    const transaction = await sut.execute({
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

    expect(transaction).toEqual(
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
});
