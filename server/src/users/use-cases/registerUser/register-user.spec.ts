import { BusinessUnits, Roles } from '@shared/constants';
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
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gcbinvestimentos.com',

        business_unit: BusinessUnits.ADIANTE,
        role: Roles.ACADEMY,
      }),
    );
  });

  it('should be able to register an with Admin role', async () => {
    const user = await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ADMIN,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gcbinvestimentos.com',

        business_unit: BusinessUnits.ADIANTE,
        role: Roles.ADMIN,
      }),
    );
  });

  it('should be able to register an user with user role', async () => {
    const user = await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gcbinvestimentos.com',

        business_unit: BusinessUnits.ADIANTE,
        role: Roles.COLLABORATOR,
      }),
    );
  });

  it('should not be able to register a user if email passed is invalid', async () => {
    await expect(
      sut.execute({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gmail.com',

        business_unit: BusinessUnits.ADIANTE,
        role: Roles.COLLABORATOR,
      }),
    ).rejects.toThrow('Invalid email');
  });
});
