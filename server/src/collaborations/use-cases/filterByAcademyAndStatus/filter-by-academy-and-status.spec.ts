import { NotFoundException, BadRequestException } from '@nestjs/common';

import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/inMemoryCollaborationsRepository';
import { CollaborationsStatus } from '@shared/constants';
import { FilterByAcademyAndStatus } from '@collaborations/use-cases';
import { InMemoryAcademysRepository } from '@academys/test/in-memory/InMemoryAcademysRepository';

describe('Find Collaboration by Academy id', () => {
  let inMemoryAcademysRepository: InMemoryAcademysRepository
  let inMemoryCollaborationRepository: InMemoryCollaborationsRepository;
  let filterByAcademyAndStatus: FilterByAcademyAndStatus;

  beforeEach(() => {
    inMemoryAcademysRepository = new InMemoryAcademysRepository();
    inMemoryCollaborationRepository = new InMemoryCollaborationsRepository();
    filterByAcademyAndStatus = new FilterByAcademyAndStatus(
      inMemoryCollaborationRepository,
      inMemoryAcademysRepository
    );
  });

  it('should throw an error if academy_id passed does not exists', async () => {
    const academy = await inMemoryAcademysRepository.create({
      name: 'Academy',
      email: 'academy@gcbinvestimentos.com',
    });

    const collaboration = await inMemoryCollaborationRepository.create({
      collaboration_type_id: '0a1b5baa-a8dd-4aff-90cd-5accc7a266f0',
      collaborator_id: 'f8007e10-b750-4e24-9342-21c1f51e1f99',
      academy_id: [academy.id],
      status: CollaborationsStatus.PENDING,
    });

    const sut = await filterByAcademyAndStatus.execute({
      status: CollaborationsStatus.PENDING,
      academy_id: '2d07039b-7780-4cc6-9a7a-53b234f4febe',
    });

    await expect(sut).rejects.toEqual(new NotFoundException('Academy not found'));


  })

  it('should find academy with collaboration status passed', async () => {
    const academy = await inMemoryAcademysRepository.create({
      name: 'Academy',
      email: 'academy@gcbinvestimentos.com',
    });
    const collaboration1 = await inMemoryCollaborationRepository.create({
      collaboration_type_id: '0a1b5baa-a8dd-4aff-90cd-5accc7a266f0',
      collaborator_id: 'f8007e10-b750-4e24-9342-21c1f51e1f99',
      academy_id: [academy.id],
      status: CollaborationsStatus.PENDING,
    });

    const collaboration2 = await inMemoryCollaborationRepository.create({
      collaboration_type_id: 'e802eade-11c6-4c94-9e0b-37dfdfd67c87',
      collaborator_id: '3ed27bd9-9a87-4f75-9a84-17e1949311d3',
      academy_id: [academy.id],
      status: CollaborationsStatus.PENDING,
    });

    const pendingCollaborations = await filterByAcademyAndStatus.execute({
      status: CollaborationsStatus.PENDING,
      academy_id: academy.id,
    });

    expect(pendingCollaborations).toEqual([collaboration1, collaboration2]);
  });

  it('should throw an error if academy does not have collaborations with status passed', async () => {
    const academy = await inMemoryAcademysRepository.create({
      name: 'Academy',
      email: 'academy@gcbinvestimentos.com',
    });

    const collaboration = await inMemoryCollaborationRepository.create({
      collaboration_type_id: '3b581175-13f2-471a-bda8-f08987ca9506',
      collaborator_id: '012f000f-bcdb-4c5f-b1bf-d917dac65426',
      academy_id: [academy.id],
      status: CollaborationsStatus.PENDING,
    });

    await expect(
      filterByAcademyAndStatus.execute({
        status: CollaborationsStatus.APPROVED,
        academy_id: academy.id,
      }),
    ).rejects.toEqual(new NotFoundException('No collaborations were found'));
  });

  it('should throw and error if status is not passed', async () => {
    await expect(
      filterByAcademyAndStatus.execute({
        status: null,
        academy_id: '',
      }),
    ).rejects.toEqual(new BadRequestException('Id and Status are required!'));
  });
});
