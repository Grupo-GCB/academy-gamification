import { Academys, RedeemSubType, Status, Types } from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory';
import { FindById } from '@transactions/use-cases';

describe('Find a transaction by id', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let sut: FindById;

  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new FindById(inMemoryTransactionsRepository);
  });

  it('should be able to find a transaction by id', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      type: Types.COLLABORATION,
      sub_type: RedeemSubType.PEERCREDIT,
      status: Status.APPROVED,
      gcbits: 5000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      user: 'thiago.ribeiro@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      type: Types.REDEEM,
      sub_type: RedeemSubType.ACADEMY,
      status: Status.PENDING,
      gcbits: 5000,
    });

    const transactionFound = await sut.execute(transaction.id);

    expect(transactionFound).not.toEqual(transaction2);
    expect(transactionFound).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        type: transaction.type,
        sub_type: transaction.sub_type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should not be able to find a nonexisent transaction', async () => {
    await expect(async () => {
      await sut.execute('793139f0-7dcd-470e-a868-88196d8ac20b');
    }).rejects.toThrow('Transação não existe!');
  });
});
