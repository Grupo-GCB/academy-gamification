import { FilterByAcademyAndStatus } from './filter-collaborations-by-status';
import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/inMemoryCollaborationsRepository';
import { NotFoundException } from '@nestjs/common';
import { CollaborationsStatus } from '@shared/constants';

describe('Find Collaboration by Academy id', () => {
  let inMemoryCollaborationRepository: InMemoryCollaborationsRepository;
  let filterByAcademyAndStatus: FilterByAcademyAndStatus;

  beforeEach(() => {
    inMemoryCollaborationRepository = new InMemoryCollaborationsRepository();
    filterByAcademyAndStatus = new FilterByAcademyAndStatus(
      inMemoryCollaborationRepository,
    );
  });

  it('should find academy with collaboration status passed', async () => {
    const collaboration1 = await inMemoryCollaborationRepository.create({
      collaboration_type_id: '0a1b5baa-a8dd-4aff-90cd-5accc7a266f0',
      collaborator_id: 'f8007e10-b750-4e24-9342-21c1f51e1f99',
      academy_id: ['bb324053-cfe0-49ad-9c24-1d6bd368555e'],
      status: CollaborationsStatus.pending,
    });

    const collaboration2 = await inMemoryCollaborationRepository.create({
      collaboration_type_id: 'e802eade-11c6-4c94-9e0b-37dfdfd67c87',
      collaborator_id: '3ed27bd9-9a87-4f75-9a84-17e1949311d3',
      academy_id: ['bb324053-cfe0-49ad-9c24-1d6bd368555e'],
      status: CollaborationsStatus.pending,
    });

    const pendingCollaborations = await filterByAcademyAndStatus.execute({
      status: CollaborationsStatus.pending,
      academy_id: 'bb324053-cfe0-49ad-9c24-1d6bd368555e',
    });

    expect(pendingCollaborations).toEqual([collaboration1, collaboration2]);
  });

  it('should throw an error if academy does not have collaborations with status passed', async () => {
    const collaboration = await inMemoryCollaborationRepository.create({
      collaboration_type_id: '3b581175-13f2-471a-bda8-f08987ca9506',
      collaborator_id: '012f000f-bcdb-4c5f-b1bf-d917dac65426',
      academy_id: ['94a3635a-6bcd-4894-a3e1-98d76150e3ca'],
      status: CollaborationsStatus.pending,
    });

    await expect(
      filterByAcademyAndStatus.execute({
        status: CollaborationsStatus.pending,
        academy_id: 'academy',
      }),
    ).rejects.toEqual(new NotFoundException('No collaborations were found'));
  });
});
