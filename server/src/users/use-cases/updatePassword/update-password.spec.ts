import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory';
import { UpdatePassword } from '@users/use-cases';

describe('Update user password', () => {
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

    await sut.execute({
      id: collaborator.id,
      password: 'gcb123',
      new_password: 'pa876ssword',
      confirm_new_password: 'pa876ssword',
    });

    await expect(
      inMemoryUsersRepository.findById(collaborator.id),
    ).resolves.toEqual(
      expect.objectContaining({ password: collaborator.password }),
    );
  });

  it('should not be able to update a non-existing user password', async () => {
    await expect(
      sut.execute({
        id: '908c3c38-f3ce-4380-8e80-2b8708a2dd2e',
        password: 'password123',
        new_password: 'pa91489ssword',
        confirm_new_password: 'pa91489ssword',
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
        new_password: 'pa91489ssword',
        confirm_new_password: 'pa91489ssword',
      }),
    ).rejects.toThrow('Incorrect current password');
  });

  it('should not be able to update an user password if password passed is too weak', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'password123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        id: collaborator.id,
        password: 'password123',
        new_password: 'easy-password',
        confirm_new_password: 'easy-password',
      }),
    ).rejects.toThrow('Too weak password');
  });

  it('should not be able to update an user password if confirm password passed is different to new password', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'password123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        id: collaborator.id,
        password: 'password123',
        new_password: 'pa91489ssword',
        confirm_new_password: 'not_pa91489ssword',
      }),
    ).rejects.toThrow('Confirm password must be same as new password');
  });

  it('should not be able to update an user password if new password is equal to current password', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'password123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        id: collaborator.id,
        password: 'password123',
        new_password: 'password123',
        confirm_new_password: 'password123',
      }),
    ).rejects.toThrow('Unable to change password to current password');
  });
});
