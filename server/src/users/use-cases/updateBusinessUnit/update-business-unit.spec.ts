import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory/inMemoryUserRepository';
import { UpdateBusinessUnit } from './update-business-unit';

describe('Update a transaction status', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: UpdateBusinessUnit;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new UpdateBusinessUnit(inMemoryUsersRepository);
  });

  it('should be able to update a collaborator business unit', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const updatedUser = await sut.execute({
      id: collaborator.id,
      responsible: collaborator.id,
      new_bu: BusinessUnits.PEERBR,
    });
    expect(updatedUser.business_unit).toEqual(BusinessUnits.PEERBR);

    await expect(
      inMemoryUsersRepository.findById(collaborator.id),
    ).resolves.toEqual(
      expect.objectContaining({ business_unit: BusinessUnits.PEERBR }),
    );
  });

  it('should be able to update an academy business unit', async () => {
    const academy = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const updatedUser = await sut.execute({
      id: academy.id,
      responsible: admin.id,
      new_bu: BusinessUnits.GRUPOGCB,
    });
    expect(updatedUser.business_unit).toEqual(BusinessUnits.GRUPOGCB);

    await expect(inMemoryUsersRepository.findById(academy.id)).resolves.toEqual(
      expect.objectContaining({ business_unit: BusinessUnits.GRUPOGCB }),
    );
  });

  it('should not be able to update a nonexistent user business unit', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    await expect(
      sut.execute({
        id: '19906417-70ea-4f6a-a158-c6c6043e7919',
        responsible: admin.id,
        new_bu: BusinessUnits.GRUPOGCB,
      }),
    ).rejects.toThrow('User or responsible does not exist');
  });

  it('should not be able to update an user business unit if responsible does not exist', async () => {
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
        responsible: '19906417-70ea-4f6a-a158-c6c6043e7919',
        new_bu: BusinessUnits.GRUPOGCB,
      }),
    ).rejects.toThrow('User or responsible does not exist');
  });

  it('should not be able to update an user business unit if responsible is an academy', async () => {
    const academy = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    await expect(
      sut.execute({
        id: academy.id,
        responsible: academy.id,
        new_bu: BusinessUnits.GRUPOGCB,
      }),
    ).rejects.toThrow('Academys cannot perform this action');
  });

  it('should not be able to update an user business unit to which it already belongs', async () => {
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
        responsible: collaborator.id,
        new_bu: BusinessUnits.ADIANTE,
      }),
    ).rejects.toThrow('User already belongs to this business unit');
  });

  it('should not be able to update an user bussines unit if collaborator try update other user business unit', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const collaboratorTwo = await inMemoryUsersRepository.create({
      name: 'Flavio',
      email: 'flavio.marques@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.PEERBR,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        id: collaboratorTwo.id,
        responsible: collaborator.id,
        new_bu: BusinessUnits.ADIANTE,
      }),
    ).rejects.toThrow('Collaborators can only update their own business unit');
  });
});
