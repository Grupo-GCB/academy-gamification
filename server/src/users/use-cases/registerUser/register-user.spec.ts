import { Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { RegisterUser } from './register-user';

describe('Register collaborator', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: RegisterUser;

  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUser(inMemoryUsersRepository);
  });

  it('should be able to register an user', async () => {
    const user = await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.ACADEMY,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: 'gcb123',
        role: Roles.ACADEMY,
      }),
    );
  });
});
