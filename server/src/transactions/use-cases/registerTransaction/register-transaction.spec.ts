import {
  Academys,
  Admin,
  BusinessUnits,
  CollaborationsTypes,
  Reasons,
  ReedemTypes,
  Roles,
  Status,
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
      role: Roles.ADMIN,
    });

    const transaction = await sut.execute({
      collaborator: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Admin.ADMIN,
      business_unit: BusinessUnits.ADIANTE,
      reason: Reasons.COLLABORATION,
      type: CollaborationsTypes.CODEREVIEW,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        collaborator: transaction.collaborator,
        responsible: transaction.responsible,
        business_unit: transaction.business_unit,
        reason: transaction.reason,
        type: transaction.type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should not be able to register a collaboration transaction if user is a collaborator', async () => {
    inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        collaborator: 'levi.ciarrochi@gcbinvestimentos.com',
        responsible: Academys.ACADEMY1,
        business_unit: BusinessUnits.ADIANTE,
        reason: Reasons.COLLABORATION,
        type: CollaborationsTypes.CODEREVIEW,
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
      role: Roles.ACADEMY,
    });

    await expect(
      sut.execute({
        collaborator: 'levi.ciarrochi@gcbinvestimentos.com',
        responsible: Academys.ACADEMY1,
        business_unit: BusinessUnits.ADIANTE,
        reason: Reasons.REDEEM,
        type: ReedemTypes.PEERCREDIT,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });
});
