import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { FilterByRole } from './filter-by-role';

describe('Filter users by role', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: FilterByRole;

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FilterByRole(inMemoryUsersRepository);
  });

  it('should throw error if no role is passed', async () => {
    await expect(async () => {
      await sut.execute({ role: undefined });
    }).rejects.toThrow('Cargo é exigido!');
  });

  it('should return all users that matches the passed role', async () => {
    const user1 = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    const user2 = await inMemoryUsersRepository.create({
      name: 'Vitor',
      email: 'vitor.farias@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    const users = await sut.execute({
      role: Roles.ACADEMY,
    });

    await expect(users).toEqual([user1, user2]);
  });
});
