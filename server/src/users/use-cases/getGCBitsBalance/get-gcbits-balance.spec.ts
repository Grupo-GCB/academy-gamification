import { BadRequestException } from '@nestjs/common';

import {
  BusinessUnits,
  CollaborationsSubType,
  Roles,
  Status,
  Types,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory';
import { InMemoryUsersRepository } from '@users/test/in-memory';
import { GetGCBitsBalance } from './get-gcbits-balance';

describe('Get an user balance', () => {
  let inMemoryUsers: InMemoryUsersRepository;
  let inMemoryTransactions: InMemoryTransactionsRepository;
  let sut: GetGCBitsBalance;

  beforeEach(() => {
    inMemoryUsers = new InMemoryUsersRepository();
    inMemoryTransactions = new InMemoryTransactionsRepository();
    sut = new GetGCBitsBalance(inMemoryTransactions, inMemoryUsers);
  });

  it('should be able to return an user gcbits balance', async () => {
    const user = await inMemoryUsers.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.COLLABORATOR,
      business_unit: BusinessUnits.ADIANTE,
    });

    const admin = await inMemoryUsers.create({
      name: 'Kayke',
      email: 'Kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.ADMIN,
      business_unit: BusinessUnits.ACADEMY,
    });

    const transaction = await inMemoryTransactions.register({
      user: user.id,
      responsible: admin.id,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.APPROVED,
      gcbits: 5000,
    });

    const userBalance = await sut.execute({ user: user.id });

    expect(userBalance).toEqual(
      expect.objectContaining({ balance: transaction.gcbits }),
    );
  });

  it('should not be able to return GCBits if id is invalid', async () => {
    await expect(
      async () => await sut.execute({ user: '1br35' }),
    ).rejects.toEqual(new BadRequestException('Id inválido!'));
  });

  it('should not be able to return a non-existing user gcbits balance', async () => {
    await expect(
      sut.execute({
        user: '0d2be89e-ca47-4f6f-b5bb-83d8fa4a41b5',
      }),
    ).rejects.toThrow('Usuário não encontrado!');
  });
});
