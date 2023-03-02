import { BadRequestException, NotFoundException } from '@nestjs/common';

import { FindByStatus } from '@collaborations/use-cases';
import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import { CollaborationsStatus } from '@shared/constants';
import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';

describe('Find collaborations by status', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let sut: FindByStatus;
  let collaboration1: Collaboration;
  let collaboration2: Collaboration;

  beforeEach(async () => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();

    sut = new FindByStatus(inMemoryCollaborationsRepository);

    collaboration1 = await inMemoryCollaborationsRepository.register({
      type: 'Logic Exercise',
      url: 'www.notion.so/logicexercise',
      collaborator_id: 'f8007e10-b750-4e24-9342-21c1f51e1f99',
      status: CollaborationsStatus.PENDING,
    });

    collaboration2 = await inMemoryCollaborationsRepository.register({
      type: 'Code Review',
      url: 'https://github.com/validatorjs/validator.js',
      collaborator_id: '69de5f11-6b66-45df-bf92-a633dc3382c7',
      status: CollaborationsStatus.PENDING,
    });
  });

  it('should throw an error if status is not passed', async () => {
    await expect(sut.execute(undefined)).rejects.toEqual(
      new BadRequestException('Status is required'),
    );
  });

  it('should throw an error if no collaboration with status passed is found', async () => {
    await expect(
      sut.execute({ status: CollaborationsStatus.APPROVED }),
    ).rejects.toEqual(new NotFoundException('No collaborations found'));
  });

  it('should return all collaborations that matches status passed', async () => {
    const collaborations = await sut.execute({
      status: CollaborationsStatus.PENDING,
    });

    await expect(collaborations).toEqual([collaboration1, collaboration2]);
  });
});
