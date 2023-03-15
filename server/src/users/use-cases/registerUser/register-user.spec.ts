import { Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { RegisterUser } from './register-user';

describe('Register user', () => {
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

  it('should be able to register an with Admin role', async () => {
    const user = await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.ADMIN,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: 'gcb123',
        role: Roles.ADMIN,
      }),
    );
  });

  it('should be able to register an user with Collaborator role', async () => {
    const user = await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.COLLABORATOR,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: 'gcb123',
        role: Roles.COLLABORATOR,
      }),
    );
  });
});
