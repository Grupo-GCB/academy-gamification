import {
  Academys,
  CollaborationsSubType,
  Status,
  Types,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory';
import { FilterByStatus } from '@transactions/use-cases';

describe('Filter transactions by status', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let sut: FilterByStatus;

  beforeEach(async () => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new FilterByStatus(inMemoryTransactionsRepository);
  });

  it('should throw error if no status is passed', async () => {
    await expect(async () => {
      await sut.execute({ status: undefined });
    }).rejects.toThrow('Status é exigido!');
  });

  it('should return all transactions that matches the passed status', async () => {
    const transaction1 = await inMemoryTransactionsRepository.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      user: 'thiago.ribeiro@gcbinvestimentos.com',
      responsible: Academys.ACADEMY4,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.FEEDBACK,
      status: Status.PENDING,
      gcbits: 7000,
    });

    const transactions = await sut.execute({
      status: Status.PENDING,
    });

    await expect(transactions).toEqual([transaction2]);
    expect(transactions).not.toEqual([transaction1]);
  });
});
