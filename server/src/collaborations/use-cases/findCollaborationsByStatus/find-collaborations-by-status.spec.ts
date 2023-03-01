import { BadRequestException, NotFoundException } from '@nestjs/common';

import { FindByStatus } from '@collaborations/use-cases';
import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import { CollaborationsStatus } from '@shared/constants';

describe('Find collaborations by status', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let findByStatus: FindByStatus;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();
    findByStatus = new FindByStatus(inMemoryCollaborationsRepository);
  });

  it('should throw an error if status is not passed', async () => {
    const sut = findByStatus.execute(null);
    await expect(sut).rejects.toEqual(
      new BadRequestException('Status is required'),
    );
  });

  it('should throw an error if status passed is not in CollaborationsStatus enum', async () => {
    const sut = findByStatus.execute('delivering');
    await expect(sut).rejects.toEqual(
      new BadRequestException('Status passed is invalid'),
    );
  });

  it('should throw an error if no collaboration with status passed is found', async () => {
    const collaboration1 = await inMemoryCollaborationsRepository.register({
      type: 'Logic Exercise',
      url: 'www.notion.so/logicexercise',
      collaborator_id: 'f8007e10-b750-4e24-9342-21c1f51e1f99',
      status: CollaborationsStatus.PENDING,
    });

    const collaboration2 = await inMemoryCollaborationsRepository.register({
      type: 'Code Review',
      url: 'github.com/repoName',
      collaborator_id: '69de5f11-6b66-45df-bf92-a633dc3382c7',
      status: CollaborationsStatus.PENDING,
    });

    await expect(
      findByStatus.execute(CollaborationsStatus.APPROVED),
    ).rejects.toEqual(new NotFoundException('No collaborations found'));
  });

  it('should return all collaborations that matches status passed', async () => {
    const collaboration1 = await inMemoryCollaborationsRepository.register({
      type: 'Logic Exercise',
      url: 'www.notion.so/logicexercise',
      collaborator_id: 'f8007e10-b750-4e24-9342-21c1f51e1f99',
      status: CollaborationsStatus.PENDING,
    });

    const collaboration2 = await inMemoryCollaborationsRepository.register({
      type: 'Code Review',
      url: 'github.com/repoName',
      collaborator_id: '69de5f11-6b66-45df-bf92-a633dc3382c7',
      status: CollaborationsStatus.PENDING,
    });

    const sut = await findByStatus.execute(CollaborationsStatus.PENDING);

    await expect(sut).toEqual([collaboration1, collaboration2]);
  });
});
