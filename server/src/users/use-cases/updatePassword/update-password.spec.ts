import { compare } from 'bcrypt';

import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { UpdatePassword } from './update-password';

describe('Update an user password', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: UpdatePassword;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new UpdatePassword(inMemoryUsersRepository);
  });

  it('should be able to update an user password', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const updatedUser = await sut.execute({
      id: collaborator.id,
      password: collaborator.password,
      new_password: 'newpassword123',
    });

    const isValidPassword = await compare(
      'newpassword123',
      updatedUser.password,
    );

    expect(isValidPassword).toEqual(true);

    await expect(
      inMemoryUsersRepository.findOne(collaborator.id),
    ).resolves.toEqual(
      expect.objectContaining({ password: updatedUser.password }),
    );
  });

  it('should not be able to update a non-existing user password', async () => {
    await expect(
      sut.execute({
        id: '908c3c38-f3ce-4380-8e80-2b8708a2dd2e',
        password: 'password123',
        new_password: 'newpassword123',
      }),
    ).rejects.toThrow('User does not exist');
  });

  it('should not be able to update an user password if actually password passed is incorrect', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        id: collaborator.id,
        password: 'password123',
        new_password: 'newpassword123',
      }),
    ).rejects.toThrow('Incorrect current password');
  });
});
