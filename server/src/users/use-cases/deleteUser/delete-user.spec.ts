import {
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { DeleteUser } from './delete-user';

describe('Delete an user', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: DeleteUser;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUser(inMemoryUsersRepository);
  });

  it('should be able to delete an user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    await sut.execute({ user: user.id, admin: admin.id });

    await expect(inMemoryUsersRepository.findOne(user.id)).resolves.toEqual(
      expect.objectContaining({
        deleted_at: expect.any(Date),
      }),
    );
  });

  it('should not be able to delete a non-existing user', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    await expect(
      async () =>
        await sut.execute({
          user: '694920a3-e253-4624-95cc-dd6fea1520d3',
          admin: admin.id,
        }),
    ).rejects.toEqual(new NotFoundException('User or admin does not exist'));
  });

  it('should not be able to delete an user with non-existing admin', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ACADEMY,
    });

    await expect(
      async () =>
        await sut.execute({
          user: user.id,
          admin: '694920a3-e253-4624-95cc-dd6fea1520d3',
        }),
    ).rejects.toEqual(new NotFoundException('User or admin does not exist'));
  });

  it('should not be able to delete an user if not an admin', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    const userTwo = await inMemoryUsersRepository.create({
      name: 'Vitor',
      email: 'vitor.freitas@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    await expect(
      async () =>
        await sut.execute({
          user: user.id,
          admin: userTwo.id,
        }),
    ).rejects.toEqual(
      new UnauthorizedException('Only admins can delete users'),
    );
  });

  it('should not be able to delete yourself', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    await expect(
      async () =>
        await sut.execute({
          user: admin.id,
          admin: admin.id,
        }),
    ).rejects.toEqual(
      new MethodNotAllowedException('Unable to delete yourself'),
    );
  });
});
