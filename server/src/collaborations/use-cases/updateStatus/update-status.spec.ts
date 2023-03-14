import { BadRequestException } from '@nestjs/common';

import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import { UpdateStatus } from '@collaborations/use-cases';
import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
  UserRoles,
} from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';

describe('Update a collaboration status', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: UpdateStatus;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new UpdateStatus(
      inMemoryCollaborationsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to update a collaboration status', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.ADMIN,
    });

    const collaboration = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      business_unit: BusinessUnits.PEERBR,
      collaborator_id: 'f69524cd-eed9-4f22-af64-b9c3e8ba850c',
      status: CollaborationsStatus.PENDING,
    });

    const updatedCollaboration = await sut.execute({
      collaboration_id: collaboration.id,
      newStatus: CollaborationsStatus.APPROVED,
      admin_id: (await user).id,
    });
    expect(updatedCollaboration.status).toEqual(CollaborationsStatus.APPROVED);

    await expect(
      inMemoryCollaborationsRepository.findOne(collaboration.id),
    ).resolves.toEqual(
      expect.objectContaining({
        status: CollaborationsStatus.APPROVED,
      }),
    );
  });

  it('should not be able to update a nonexistent collaboration status', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.ADMIN,
    });

    await expect(
      sut.execute({
        collaboration_id: '52ec6f4e-091f-46e5-ac7b-6ef8c4d895af',
        newStatus: CollaborationsStatus.APPROVED,
        admin_id: (await user).id,
      }),
    ).rejects.toThrow('Collaboration not found');
  });

  it('should throw error if collaboration_id or new status are not passed', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.ADMIN,
    });

    const collaboration = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      business_unit: BusinessUnits.ADIANTE,
      collaborator_id: 'f69524cd-eed9-4f22-af64-b9c3e8ba850c',
      status: CollaborationsStatus.PENDING,
    });

    await expect(
      sut.execute({
        collaboration_id: collaboration.id,
        newStatus: undefined,
        admin_id: (await user).id,
      }),
    ).rejects.toThrow(new BadRequestException('newStatus is required'));
  });

  it('should not be able to update a collaboration if user is not a administrator', async () => {
    const user = inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.ACADEMY,
    });

    const collaboration = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      business_unit: BusinessUnits.PEERBR,
      collaborator_id: 'f69524cd-eed9-4f22-af64-b9c3e8ba850c',
      status: CollaborationsStatus.PENDING,
    });

    await expect(
      sut.execute({
        collaboration_id: collaboration.id,
        newStatus: CollaborationsStatus.APPROVED,
        admin_id: (await user).id,
      }),
    ).rejects.toThrow(
      new BadRequestException('You should must be a administrator'),
    );
  });
});
