import { FilterCollaborationsByStatus } from './filter-collaborations-by-status';
import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/inMemoryCollaborationsRepository';
import { NotFoundException } from '@nestjs/common';
import { CollaborationsStatus } from 'shared/constants';

describe('Find Collaboration by Academy id', () => {
  let inMemoryCollaborationRepository: InMemoryCollaborationsRepository;
  let filterCollaborationsByStatus: FilterCollaborationsByStatus;

  beforeEach(() => {
    inMemoryCollaborationRepository = new InMemoryCollaborationsRepository();
    filterCollaborationsByStatus = new FilterCollaborationsByStatus(
      inMemoryCollaborationRepository,
    );
  });

  it('should find academy with passed collaboration status passed', async () => {
    const collaboration1 = await inMemoryCollaborationRepository.create({
      collaboration_type_id: '123456',
      collaborator_id: '123456',
      academy_id: 'academy123456',
      status: CollaborationsStatus.pending,
    });

    const collaboration2 = await inMemoryCollaborationRepository.create({
      collaboration_type_id: '654321',
      collaborator_id: '123456',
      academy_id: 'academy123456',
      status: CollaborationsStatus.pending,
    });

    const pendingCollaborations = await filterCollaborationsByStatus.execute({
      status: CollaborationsStatus.pending,
      academy_id: 'academy123456',
    });

    expect(pendingCollaborations).toEqual([collaboration1, collaboration2]);
  });

  it('should throw an error if academy does not have collaborations with passed status', async () => {
    await expect(
      filterCollaborationsByStatus.execute({
        status: CollaborationsStatus.pending,
        academy_id: 'Invalid',
      }),
    ).rejects.toEqual(new NotFoundException('No collaborations were found'));
  });
});
