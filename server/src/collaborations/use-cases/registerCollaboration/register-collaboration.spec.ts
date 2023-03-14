import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
  UserRoles,
} from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { RegisterCollaboration } from './register-collaboration';

describe('Register a collaboration', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: RegisterCollaboration;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();

    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new RegisterCollaboration(
      inMemoryCollaborationsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to register a collaboration', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.COLLABORATOR,
    });

    const collaboration = await sut.execute({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      collaborator_id: (await user).id,
      status: CollaborationsStatus.PENDING,
      business_unit: BusinessUnits.ADIANTE,
    });

    expect(collaboration).toEqual(
      expect.objectContaining({
        type: CollaborationsTypes.CODEREVIEW,
        url: collaboration.url,
        collaborator_id: (await user).id,
        id: collaboration.id,
        status: CollaborationsStatus.PENDING,
        business_unit: BusinessUnits.ADIANTE,
      }),
    );

    await expect(
      inMemoryCollaborationsRepository.filterByStatus({
        status: CollaborationsStatus.PENDING,
      }),
    ).resolves.toEqual([
      {
        type: collaboration.type,
        url: collaboration.url,
        collaborator_id: collaboration.collaborator_id,
        id: collaboration.id,
        status: collaboration.status,
        business_unit: collaboration.business_unit,
      },
    ]);
  });

  it('should not be able to register a collaboration if user is not a collaborator', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.ACADEMY,
    });

    await expect(
      sut.execute({
        type: CollaborationsTypes.CODEREVIEW,
        url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
        collaborator_id: (await user).id,
        status: CollaborationsStatus.PENDING,
        business_unit: BusinessUnits.ADIANTE,
      }),
    ).rejects.toThrow('You should must be a collaborator');
  });
});
