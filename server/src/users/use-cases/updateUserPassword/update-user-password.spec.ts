import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { UpdateUserPassword } from './update-user-password';

describe('Update user password', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: UpdateUserPassword;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new UpdateUserPassword(inMemoryUsersRepository);
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
      email: collaborator.email,
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
        email: 'kayke.fujinaka@gcbinvestimentos.com',
        password: 'password123',
        new_password: 'pa91489ssword',
        confirm_new_password: 'pa91489ssword',
      }),
    ).rejects.toThrow('Usuário não existe!');
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
        email: collaborator.email,
        password: 'password123',
        new_password: 'pa91489ssword',
        confirm_new_password: 'pa91489ssword',
      }),
    ).rejects.toThrow('Senha atual inválida!');
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
        email: collaborator.email,
        password: 'password123',
        new_password: 'easy-password',
        confirm_new_password: 'easy-password',
      }),
    ).rejects.toThrow('Muito fraca!');
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
        email: collaborator.email,
        password: 'password123',
        new_password: 'pa91489ssword',
        confirm_new_password: 'not_pa91489ssword',
      }),
    ).rejects.toThrow(
      'A confirmação da nova senha deve ser a mesma da nova senha!',
    );
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
        email: collaborator.email,
        password: 'password123',
        new_password: 'password123',
        confirm_new_password: 'password123',
      }),
    ).rejects.toThrow('Incapaz de alterar a senha atual!');
  });
});
