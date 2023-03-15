import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { FindByEmail } from './find-by-email';

describe('Find an user by email', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: FindByEmail;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FindByEmail(inMemoryUsersRepository);
  });

  it('should be able to find an user by email', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    const userFound = await sut.execute(user.email);

    expect(userFound).toEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        business_unit: user.business_unit,
        role: user.role,
      }),
    );
  });

  it('should not be able to find a nonexistent user', async () => {
    await expect(async () => {
      await sut.execute('john.doe@gcbinvestimentos.com');
    }).rejects.toThrow('User does not exist');
  });
});
