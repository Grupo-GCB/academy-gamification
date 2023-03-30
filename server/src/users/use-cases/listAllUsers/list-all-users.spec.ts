import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory';
import { ListAllUsers } from '@users/use-cases';

describe('Find all users', () => {
  let inMemoryUsers: InMemoryUsersRepository;
  let sut: ListAllUsers;

  beforeEach(() => {
    inMemoryUsers = new InMemoryUsersRepository();
    sut = new ListAllUsers(inMemoryUsers);
  });

  it('should be able to return all users', async () => {
    const userOne = await inMemoryUsers.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.ADMIN,
      business_unit: BusinessUnits.ACADEMY,
    });

    const userTwo = await inMemoryUsers.create({
      name: 'Caio',
      email: 'caio.miguel@gcbinvestimentos.com',
      password: 'gcb123',
      role: Roles.COLLABORATOR,
      business_unit: BusinessUnits.GRUPOGCB,
    });

    const users = await sut.execute();

    expect(users).toEqual(expect.arrayContaining([userOne, userTwo]));
  });

  it('should return an empty array', async () => {
    const users = await sut.execute();

    expect(users).toEqual(expect.arrayContaining([]));
  });
});
