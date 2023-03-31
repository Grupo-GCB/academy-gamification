import { BusinessUnits, Roles } from '@shared/constants';

import { InMemoryUsersRepository } from '@users/test/in-memory';
import { ValidateUser } from '@auth/use-cases';
import { User } from '@users/infra/entities';

describe('Valdiate User', () => {
  let inMemoryUserRepository: InMemoryUsersRepository;
  let sut: ValidateUser;
  let user: User;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new ValidateUser(inMemoryUserRepository);
    user = await inMemoryUserRepository.create({
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });
  });

  it('should return a user if email and password are correct', async () => {
    const validatedUser = await sut.execute(
      'levi.ciarrochi@gcbinvestimentos.com',
      'gcb123',
    );

    user.password = undefined;

    expect(validatedUser).toEqual(user);
  });

  it('should throw an error if there is no user with passed email', async () => {
    await expect(
      sut.execute('vitor.freitas@gcbinvestimentos.com', 'gcb123'),
    ).rejects.toThrow(new Error('Endereço de e-mail ou senha incorretos'));
  });

  it('should throw an error if password is incorrect', async () => {
    await expect(
      sut.execute('levi.ciarrochi@gcbinvestimentos.com', 'gcbola123'),
    ).rejects.toThrow(new Error('Endereço de e-mail ou senha incorretos'));
  });
});
