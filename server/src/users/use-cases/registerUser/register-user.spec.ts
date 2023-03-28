import { BusinessUnits } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { RegisterUser } from './register-user';

describe('Register user', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: RegisterUser;

  beforeEach(() => {
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

  it('should not be able to register an user if invalid email is passed', async () => {
    await expect(
      sut.execute({
        email: 'gustavo.wuelta@gmail.com',
        business_unit: BusinessUnits.ADIANTE,
      }),
    ).rejects.toThrow('E-mail inválido!');
  });
});
