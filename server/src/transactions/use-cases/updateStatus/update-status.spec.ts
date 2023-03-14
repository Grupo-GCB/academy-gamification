import { BadRequestException } from '@nestjs/common';

import { BusinessUnits, Reasons, Roles, Status } from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { UpdateStatus } from './update-status';

describe('Update a transaction status', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: UpdateStatus;

  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new UpdateStatus(
      inMemoryTransactionsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to update a transaction status', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.ADMIN,
    });

    const transaction = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      user_id: (await user).id,
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: Status.PENDING,
      gcbits: 5000,
    });

    const updatedTransaction = await sut.execute({
      id: transaction.id,
      newStatus: Status.APPROVED,
      user_id: (await user).id,
    });
    expect(updatedTransaction.status).toEqual(Status.APPROVED);

    await expect(
      inMemoryTransactionsRepository.findOne(transaction.id),
    ).resolves.toEqual(expect.objectContaining({ status: Status.APPROVED }));
  });

  it('shoud not be able to update a nonexistent transaction status', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.ADMIN,
    });

    await expect(
      sut.execute({
        id: '19906417-70ea-4f6a-a158-c6c6043e7919',
        newStatus: Status.PENDING,
        user_id: (await user).id,
      }),
    ).rejects.toThrow('Transaction not found');
  });

  it('should throw error if new status are not passed', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      user_id: 'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: Status.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: transaction.id,
        newStatus: undefined,
        user_id: transaction.user_id,
      }),
    ).rejects.toThrow(new BadRequestException('newStatus is required'));
  });

  it('should throw error if id are not passed', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      user_id: 'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: Status.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: undefined,
        newStatus: transaction.status,
        user_id: transaction.user_id,
      }),
    ).rejects.toThrow(new BadRequestException('id is required'));
  });

  it('should not be able to update a collaboration if user is not a administrator', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.ACADEMY,
    });

    const transaction = await inMemoryTransactionsRepository.register({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      user_id: (await user).id,
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: Status.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: transaction.id,
        newStatus: Status.APPROVED,
        user_id: (await user).id,
      }),
    ).rejects.toThrow(new BadRequestException('you must be a administrator'));
  });
});
