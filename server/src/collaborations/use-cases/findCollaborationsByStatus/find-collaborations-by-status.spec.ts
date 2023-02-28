import { BadRequestException } from '@nestjs/common';

import { FindByStatus } from '@collaborations/use-cases';
import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';

describe('Find collaborations by status', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let findByStatus: FindByStatus;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();
    findByStatus = new FindByStatus(inMemoryCollaborationsRepository);
  });

  it('should throw an error if status is not passed', async () => {
    await expect(findByStatus.execute(null)).rejects.toEqual(
      new BadRequestException('Status is required'),
    );
  });
});
