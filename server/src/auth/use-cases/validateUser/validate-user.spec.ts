import { BusinessUnits, Roles } from '@shared/constants';

import { InMemoryUsersRepository } from '@users/test/in-memory';
import { ValidateUser } from '@auth/use-cases';
import { User } from '@users/infra/entities';

describe('ValdiateUser', () => {
  let inMemoryUserRepository: InMemoryUsersRepository;
  let sut: ValidateUser;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new ValidateUser(inMemoryUserRepository);
  });

  it('should return a user if email and password are correct', async () => {
    const user: User = await inMemoryUserRepository.create({
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const validatedUser = await sut.execute(
      'levi.ciarrochi@gcbinvestimentos.com',
      'gcb123',
    );

    console.log(validatedUser);

    user.password = undefined;

    expect(validatedUser).toEqual(user);
  });

  it('should throw an error if there is no user with passed email', async () => {
    const user: User = await inMemoryUserRepository.create({
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute('vitor.freitas@gcbinvestimentos.com', 'gcb123'),
    ).rejects.toThrow(new Error('Endereço de e-mail ou senha incorretos'));
  });

  it('should throw an error if password is incorrect', async () => {
    const user: User = await inMemoryUserRepository.create({
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute('levi.ciarrochi@gcbinvestimentos.com', 'gcbola123'),
    ).rejects.toThrow(new Error('Endereço de e-mail ou senha incorretos'));
  });
});
