import { BadRequestException } from '@nestjs/common';
import { BusinessUnits, Roles } from '@shared/constants';
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
      name: 'Levi',
      email: 'levi.cirarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
        password: user.password,
        business_unit: BusinessUnits.ADIANTE,
        role: Roles.ACADEMY,
      }),
    );
  });

  it('should be able to register an with Admin role', async () => {
    const user = await sut.execute({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ADMIN,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
        password: user.password,
        business_unit: BusinessUnits.ADIANTE,
        role: Roles.ADMIN,
      }),
    );
  });

  it('should be able to register an user with user role', async () => {
    const user = await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
        password: user.password,
        business_unit: BusinessUnits.ADIANTE,
        role: Roles.COLLABORATOR,
      }),
    );
  });

  it('should not be able to register an user', async () => {
    await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        name: 'Pedro',
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: 'gcb123',
        business_unit: BusinessUnits.ADIANTE,
        role: Roles.COLLABORATOR,
      }),
    ).rejects.toEqual(new BadRequestException('Email already registered'));
  });
});
