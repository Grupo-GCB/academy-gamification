import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
} from '@shared/constants';

import { Collaboration } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import { FindByStatus } from '@collaborations/use-cases';

describe('Find collaborations by status', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let sut: FindByStatus;
  let collaboration1: Collaboration;
  let collaboration2: Collaboration;

  beforeEach(async () => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();

    sut = new FindByStatus(inMemoryCollaborationsRepository);

    collaboration1 = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.LOGICEXERCISE,
      url: 'www.notion.so/logicexercise',
      collaborator_id: 'f8007e10-b750-4e24-9342-21c1f51e1f99',
      business_unit: BusinessUnits.ADIANTE,
      status: CollaborationsStatus.PENDING,
    });

    collaboration2 = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/example/example',
      collaborator_id: '69de5f11-6b66-45df-bf92-a633dc3382c7',
      business_unit: BusinessUnits.PEERBR,
      status: CollaborationsStatus.PENDING,
    });
  });

  it('should throw an error if status is not passed', async () => {
    try {
      await sut.execute({ status: undefined });
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('Status is required');
    }
  });

  it('should throw an error if no collaboration with status passed is found', async () => {
    try {
      await sut.execute({ status: CollaborationsStatus.APPROVED });
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toBe('No collaborations found');
    }
  });

  it('should return all collaborations that matches status passed', async () => {
    const collaborations = await sut.execute({
      status: CollaborationsStatus.PENDING,
    });

    await expect(collaborations).toEqual([collaboration1, collaboration2]);
  });
});
