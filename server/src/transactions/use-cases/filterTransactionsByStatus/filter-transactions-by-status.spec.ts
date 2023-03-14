import { BadRequestException } from '@nestjs/common';

import { BusinessUnits, Reasons, Status } from '@shared/constants';
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
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      user_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: Status.APPROVED,
      gcbits: 5000,
    });

    const transaction2 = await inMemoryTransactionsRepository.register({
      collaborator_id: 'c4672407-a0aa-41a8-af19-3e77908b1962',
      user_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'b439414a-bf83-47d9-a0aa-4435c124ff8f',
        'aee21299-0891-4c8a-98e9-1c9ae7d152cb',
      ],
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
