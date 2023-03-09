import { BadRequestException } from '@nestjs/common';

import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { UpdateStatus } from './update-status';

describe('Update a transaction status', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let sut: UpdateStatus;

  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new UpdateStatus(inMemoryTransactionsRepository);
  });

  it('should be able to update a transaction status', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      business_unit: BusinessUnits.ADIANTE,
      reason: TransactionReasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: CollaborationsStatus.PENDING,
      gcbits: 5000,
    });

    const updatedTransaction = await sut.execute({
      id: transaction.id,
      newStatus: CollaborationsStatus.APPROVED,
    });
    expect(updatedTransaction.status).toEqual(CollaborationsStatus.APPROVED);

    await expect(
      inMemoryTransactionsRepository.findOne(transaction.id),
    ).resolves.toEqual(
      expect.objectContaining({ status: CollaborationsStatus.APPROVED }),
    );
  });

  it('shoud not be able to update a nonexistent transaction status', async () => {
    await expect(
      sut.execute({
        id: '19906417-70ea-4f6a-a158-c6c6043e7919',
        newStatus: CollaborationsStatus.PENDING,
      }),
    ).rejects.toThrow('Transaction not found');
  });

  it('should throw error if new status are not passed', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      business_unit: BusinessUnits.ADIANTE,
      reason: TransactionReasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: CollaborationsStatus.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: transaction.id,
        newStatus: undefined,
      }),
    ).rejects.toThrow(new BadRequestException('newStatus is required'));
  });

  it('should throw error if id are not passed', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      business_unit: BusinessUnits.ADIANTE,
      reason: TransactionReasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: CollaborationsStatus.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: undefined,
        newStatus: transaction.status,
      }),
    ).rejects.toThrow(new BadRequestException('id is required'));
  });
});
