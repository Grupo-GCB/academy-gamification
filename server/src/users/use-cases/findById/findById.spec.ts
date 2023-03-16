import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { FindById } from './findById';

describe('Find an user by email', () => {
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
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    const userFound = await sut.execute(user.id);

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
      await sut.execute('a627d758-8d8d-4e75-9937-835a1f02b43e');
    }).rejects.toThrow('User does not exist');
  });
});
