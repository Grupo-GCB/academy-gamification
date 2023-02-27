import { NotFoundException } from '@nestjs/common';

import { InMemoryAcademysRepository } from '@academys/test/in-memory/InMemoryAcademysRepository';
import { FindByIdUseCase } from '@academys/use-cases';

describe('Find Academy by id', () => {
  let inMemoryAcademysRepository: InMemoryAcademysRepository;
  let findByIdUseCase: FindByIdUseCase;

  beforeEach(() => {
    inMemoryAcademysRepository = new InMemoryAcademysRepository();
    findByIdUseCase = new FindByIdUseCase(inMemoryAcademysRepository);
  });

  it('should be able to find a academy by id', async () => {
    const academy = await inMemoryAcademysRepository.create({
      name: 'Academy',
      email: 'academy@gcbinvestimentos.com',
    });

    const sut = await findByIdUseCase.execute(academy.id);

    expect(sut).toEqual(
      expect.objectContaining({
        id: academy.id,
        name: academy.name,
        email: academy.email,
      }),
    );
  });

  it('should not be able to find a nonexistent academy id', async () => {
    await expect(findByIdUseCase.execute('Invalid Id')).rejects.toEqual(
      new NotFoundException('Academy does not exist'),
    );
  });
});
