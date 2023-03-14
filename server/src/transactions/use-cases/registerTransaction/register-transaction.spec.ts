import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
  UserRoles,
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
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.ADMIN,
    });

    const transaction = await sut.execute({
      collaborator_id: '13f866c-2ba0-42b7-83c9-50bb61c5c167',
      user_id: (await user).id,
      business_unit: BusinessUnits.ADIANTE,
      reason: TransactionReasons.COLLABORATION,
      type: 'Participação em comitê academy',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: CollaborationsStatus.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        collaborator_id: transaction.collaborator_id,
        user_id: transaction.user_id,
        business_unit: transaction.business_unit,
        reason: transaction.reason,
        type: transaction.type,
        academys: transaction.academys,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should not be able to register a collaboration if user is a collaborator', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        collaborator_id: '13f866c-2ba0-42b7-83c9-50bb61c5c167',
        user_id: (await user).id,
        business_unit: BusinessUnits.ADIANTE,
        reason: TransactionReasons.COLLABORATION,
        type: 'Participação em comitê academy',
        academys: [
          'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
          '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
        ],
        status: CollaborationsStatus.APPROVED,
        gcbits: 3000,
      }),
    ).rejects.toThrow('Collaborators are not able to record transactions');
  });
});
