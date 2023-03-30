import { CollaborationsSubType, Status, Types } from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { FindLatestTransactionByUserAndSubType } from '@transactions/use-cases';

describe('FindLatestTransactionByUserAndSubType', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let sut: FindLatestTransactionByUserAndSubType;

  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new FindLatestTransactionByUserAndSubType(
      inMemoryTransactionsRepository,
    );
  });

  it('should be able to find the latest transaction by user and subType', async () => {
    const transaction1 = await inMemoryTransactionsRepository.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: 'vitor.freitas@gcbinvestimentos.com',
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.LOGICEXERCISE,
      status: Status.PENDING,
      gcbits: 1000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      user: 'flavio.marques@gcbinvestimentos.com',
      responsible: 'vitor.freitas@gcbinvestimentos.com',
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.LOGICEXERCISE,
      status: Status.PENDING,
      gcbits: 1000,
    });

    const latestTransaction = await inMemoryTransactionsRepository.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: 'vitor.freitas@gcbinvestimentos.com',
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.LOGICEXERCISE,
      status: Status.PENDING,
      gcbits: 2000,
    });

    const foundTransaction = await sut.execute({
      user: 'vitor.freitas@gcbinvestimentos.com',
      subType: CollaborationsSubType.LOGICEXERCISE,
    });

    expect(foundTransaction).toEqual(
      expect.objectContaining({
        id: latestTransaction.id,
        user: latestTransaction.user,
        type: Types.COLLABORATION,
        sub_type: CollaborationsSubType.LOGICEXERCISE,
        status: Status.PENDING,
        gcbits: 2000,
      }),
    );
  });
});
