import {
  Academys,
  BusinessUnits,
  RedeemSubType,
  Roles,
  Status,
  Types,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory/inMemoryTransactions';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { RegisterTransaction } from './register-transaction';

describe('Register a transaction', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: RegisterTransaction;

  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new RegisterTransaction(
      inMemoryTransactionsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to register a transaction', async () => {
    await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const transaction = await sut.execute({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Academys.ACADEMY1,
      type: Types.COLLABORATION,
      sub_type: RedeemSubType.ACADEMY,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        sub_type: transaction.sub_type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should not be able to register a collaboration transaction if user is a user', async () => {
    inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        user: 'levi.ciarrochi@gcbinvestimentos.com',
        responsible: Academys.ACADEMY1,
        type: Types.COLLABORATION,
        sub_type: RedeemSubType.MEDIUMPROJECT,
        status: Status.APPROVED,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should not be able to register a reedem transaction if user is a academy', async () => {
    inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    await expect(
      sut.execute({
        user: 'levi.ciarrochi@gcbinvestimentos.com',
        responsible: Academys.ACADEMY1,
        type: Types.REDEEM,
        sub_type: RedeemSubType.PEERCREDIT,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });
});
