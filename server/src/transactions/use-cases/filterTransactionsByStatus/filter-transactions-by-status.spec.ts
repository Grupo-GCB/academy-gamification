import { BadRequestException } from '@nestjs/common';

import {
  Academys,
  BusinessUnits,
  CollaborationsTypes,
  Reasons,
  Status,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { FilterTransactionsByStatus } from '@transactions/use-cases';

describe('Filter transactions by status', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let sut: FilterTransactionsByStatus;

  beforeEach(async () => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new FilterTransactionsByStatus(inMemoryTransactionsRepository);
  });

  it('should throw error if no status is passed', async () => {
    try {
      await sut.execute({ status: undefined });
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('Status is required');
    }
  });

  it('should return all transactions that matches the passed status', async () => {
    const transaction1 = await inMemoryTransactionsRepository.register({
      collaborator: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: CollaborationsTypes.CODEREVIEW,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      collaborator: 'thiago.ribeiro@gcbinvestimentos.com',
      responsible: Academys.ACADEMY4,
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: CollaborationsTypes.FEEDBACK,
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
