import { BadRequestException } from '@nestjs/common';

import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import { UpdateStatus } from '@collaborations/use-cases';
import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
} from '@shared/constants';

describe('Update a collaboration status', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let sut: UpdateStatus;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();
    sut = new UpdateStatus(inMemoryCollaborationsRepository);
  });

  it('should be able to update a collaboration status', async () => {
    const collaboration = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      businessUnit: BusinessUnits.PEERBR,
      collaborator_id: 'f69524cd-eed9-4f22-af64-b9c3e8ba850c',
      status: CollaborationsStatus.PENDING,
    });

    const updatedCollaboration = await sut.execute({
      collaboration_id: collaboration.id,
      newStatus: CollaborationsStatus.APPROVED,
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
    await expect(
      sut.execute({
        collaboration_id: '52ec6f4e-091f-46e5-ac7b-6ef8c4d895af',
        newStatus: CollaborationsStatus.APPROVED,
      }),
    ).rejects.toThrow('Collaboration not found');
  });

  it('should throw error if collaboration_id or new status are not passed', async () => {
    const collaboration = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      businessUnit: BusinessUnits.ADIANTE,
      collaborator_id: 'f69524cd-eed9-4f22-af64-b9c3e8ba850c',
      status: CollaborationsStatus.PENDING,
    });

    await expect(
      sut.execute({
        collaboration_id: collaboration.id,
        newStatus: undefined,
      }),
    ).rejects.toThrow(new BadRequestException('newStatus is required'));
  });
});
