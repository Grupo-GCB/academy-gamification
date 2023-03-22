import { BusinessUnits } from '@shared/constants';
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
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      business_unit: BusinessUnits.ADIANTE,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: user.password,
        business_unit: BusinessUnits.ADIANTE,
        role: user.role,
      }),
    );
  });

  it('should be able to register an with Admin role', async () => {
    const user = await sut.execute({
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      business_unit: BusinessUnits.ADIANTE,
    });

    expect(user).toEqual(
      expect.objectContaining({
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: user.password,
        business_unit: BusinessUnits.ADIANTE,
      }),
    );
  });

  it('should be able to register an user with user role', async () => {
    const user = await sut.execute({
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      business_unit: BusinessUnits.ADIANTE,
    });

    expect(user).toEqual(
      expect.objectContaining({
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: user.password,
        business_unit: BusinessUnits.ADIANTE,
      }),
    );
  });
});
