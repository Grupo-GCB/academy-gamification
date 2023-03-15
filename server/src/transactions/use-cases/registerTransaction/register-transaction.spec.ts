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

  it('', () => {});

  // it('should be able to register a transaction', async () => {
  //   const admin = await inMemoryUsersRepository.create({
  //     name: 'Kayke',
  //     email: 'kayke.fujinaka@gcbinvestimentos.com',
  //     password: 'gcb123',
  //     business_unit: BusinessUnits.ACADEMY,
  //     role: Roles.ADMIN,
  //   });

  //   const user = await inMemoryUsersRepository.create({
  //     name: 'Levi',
  //     email: 'levi.ciarrochi@gcbinvestimentos.com',
  //     password: 'gcb123',
  //     business_unit: BusinessUnits.ACADEMY,
  //     role: Roles.COLLABORATOR,
  //   });

  //   const transaction = await sut.execute({
  //     user: user.id,
  //     responsible: admin.id,
  //     type: Types.COLLABORATION,
  //     sub_type: RedeemSubType.ACADEMY,
  //     status: Status.APPROVED,
  //     gcbits: 3000,
  //   });

  //   expect(transaction).toEqual(
  //     expect.objectContaining({
  //       id: transaction.id,
  //       user: transaction.user,
  //       responsible: transaction.responsible,
  //       type: transaction.type,
  //       sub_type: transaction.sub_type,
  //       status: transaction.status,
  //       gcbits: transaction.gcbits,
  //     }),
  //   );
  // });

  //   it('should not be able to register a collaboration transaction if user is a user', async () => {
  //     const user = await inMemoryUsersRepository.create({
  //       name: 'Gustavo',
  //       email: 'gustavo.wuelta@gcbinvestimentos.com',
  //       password: 'gcb123',
  //       business_unit: BusinessUnits.ACADEMY,
  //       role: Roles.COLLABORATOR,
  //     });

  //     await expect(
  //       sut.execute({
  //         user: user.id,
  //         responsible: null,
  //         type: Types.COLLABORATION,
  //         sub_type: RedeemSubType.MEDIUMPROJECT,
  //         status: Status.APPROVED,
  //         gcbits: 3000,
  //       }),
  //     ).rejects.toThrow('You do not have permission');
  //   });

  //   it('should not be able to register a reedem transaction if user is a academy', async () => {
  //     const user = await inMemoryUsersRepository.create({
  //       name: 'Gustavo',
  //       email: 'gustavo.wuelta@gcbinvestimentos.com',
  //       password: 'gcb123',
  //       business_unit: BusinessUnits.ACADEMY,
  //       role: Roles.ACADEMY,
  //     });

  //     await expect(
  //       sut.execute({
  //         user: user.id,
  //         responsible: null,
  //         type: Types.REDEEM,
  //         sub_type: RedeemSubType.PEERCREDIT,
  //         status: Status.PENDING,
  //         gcbits: 3000,
  //       }),
  //     ).rejects.toThrow('You do not have permission');
  //   });
});
