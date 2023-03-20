import { NotFoundException } from '@nestjs/common';
import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { DeleteUser } from './delete-user';

describe('Delete a user', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: DeleteUser;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUser(inMemoryUsersRepository);
  });

  it('should be able to delete a user', async () => {
    const userCreated = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    await sut.execute(userCreated.id);

    await expect(
      inMemoryUsersRepository.findOne(userCreated.id),
    ).resolves.toEqual(
      expect.objectContaining({
        deleted_at: expect.any(Date),
      }),
    );
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(
      async () => await sut.execute('ea1cafbb-2029-4a2a-99c4-e58cde1ad7a7'),
    ).rejects.toEqual(new NotFoundException('User does not exist'));
  });
});
