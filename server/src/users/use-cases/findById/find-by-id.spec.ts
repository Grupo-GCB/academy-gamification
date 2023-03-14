import { UserRoles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { FindById } from './find-by-id';

describe('Find an user by id', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: FindById;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FindById(inMemoryUsersRepository);
  });

  it('should be able to find an user by id', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: UserRoles.ACADEMY,
    });

    const userFound = await sut.execute(user.id);

    expect(userFound).toEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      }),
    );
  });

  it('should not be able to find a nonexistent user', async () => {
    await expect(async () => {
      await sut.execute('edee8ffa-7c91-46f0-9fa6-4229f9b76768');
    }).rejects.toThrow('User does not exist');
  });
});
