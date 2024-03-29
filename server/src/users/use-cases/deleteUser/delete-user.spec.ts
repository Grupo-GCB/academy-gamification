import { BadRequestException, NotFoundException } from '@nestjs/common';

import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory';
import { DeleteUser } from '@users/use-cases';

describe('Delete an user', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: DeleteUser;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUser(inMemoryUsersRepository);
  });

  it('should be able to delete an user', async () => {
    const userCreated = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    await sut.execute(userCreated.id);

    await expect(
      inMemoryUsersRepository.findById(userCreated.id),
    ).resolves.toEqual(
      expect.objectContaining({
        deleted_at: expect.any(Date),
      }),
    );
  });

  it('should not be able to delete if id is invalid', async () => {
    await expect(async () => await sut.execute('1br35')).rejects.toEqual(
      new BadRequestException('Id inválido!'),
    );
  });

  it('should not be able to delete a non-existing user', async () => {
    await expect(
      async () => await sut.execute('d86438c9-ce7d-4fba-a9b5-b6f994960eb8'),
    ).rejects.toEqual(new NotFoundException('Usuário não existe!'));
  });
});
