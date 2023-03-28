import { BadRequestException } from '@nestjs/common';

import {
  Academys,
  Admins,
  BusinessUnits,
  CollaborationsSubType,
  Roles,
  Status,
  Types,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory';
import { UpdateStatus } from '@transactions/use-cases';
import { InMemoryUsersRepository } from '@users/test/in-memory';

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
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await inMemoryTransactionsRepository.register({
      user: collaborator.id,
      responsible: admin.id,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.LOGICEXERCISE,
      status: Status.PENDING,
      gcbits: 5000,
    });

    const updatedTransaction = await sut.execute({
      id: transaction.id,
      new_status: Status.APPROVED,
      admin: admin.id,
    });
    expect(updatedTransaction.status).toEqual(Status.APPROVED);

    await expect(
      inMemoryTransactionsRepository.findById(transaction.id),
    ).resolves.toEqual(expect.objectContaining({ status: Status.APPROVED }));
  });

  it('should not be able to update a nonexistent transaction status', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    await expect(
      sut.execute({
        id: '19906417-70ea-4f6a-a158-c6c6043e7919',
        new_status: Status.PENDING,
        admin: admin.id,
      }),
    ).rejects.toThrow('Transaction not found');
  });

  it('should throw error if new status are not passed', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: transaction.id,
        new_status: undefined,
        admin: Admins.ADMIN,
      }),
    ).rejects.toThrow(new BadRequestException('New status is required'));
  });

  it('should throw error if id are not passed', async () => {
    const transaction = await inMemoryTransactionsRepository.register({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: undefined,
        new_status: transaction.status,
        admin: Admins.ADMIN,
      }),
    ).rejects.toThrow(new BadRequestException('Id is required'));
  });

  it('should not be able to update a transaction if user is not an administrator', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await inMemoryTransactionsRepository.register({
      user: collaborator.id,
      responsible: admin.id,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: transaction.id,
        new_status: Status.APPROVED,
        admin: collaborator.id,
      }),
    ).rejects.toThrow(new BadRequestException('You must be a administrator'));
  });

  it('should not be able to update a transaction status if admin passed does not exist', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await inMemoryTransactionsRepository.register({
      user: collaborator.id,
      responsible: collaborator.id,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.PENDING,
      gcbits: 5000,
    });

    await expect(
      sut.execute({
        id: transaction.id,
        new_status: Status.APPROVED,
        admin: '19906417-70ea-4f6a-a158-c6c6043e7919',
      }),
    ).rejects.toThrow(new BadRequestException('Administrator not found'));
  });
});
