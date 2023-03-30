import { BadRequestException } from '@nestjs/common';
import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { FindById } from './find-by-id';

describe('Find an user by id', () => {
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

  it('should not be able to find if id is invalid', async () => {
    await expect(async () => await sut.execute('1br35')).rejects.toEqual(
      new BadRequestException('Id inválido!'),
    );
  });

  it('should not be able to find a nonexistent user', async () => {
    await expect(async () => {
      await sut.execute('e507fb2c-673a-400c-8a2e-b58e46a1111f');
    }).rejects.toThrow('Usuário não existe!');
  });
});
