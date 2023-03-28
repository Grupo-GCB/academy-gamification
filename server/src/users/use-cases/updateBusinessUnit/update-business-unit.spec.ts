import { BusinessUnits, Roles } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory';
import { UpdateBusinessUnit } from '@users/use-cases';

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
      email: collaborator.email,
      responsible: collaborator.email,
      new_bu: BusinessUnits.PEERBR,
    });
    expect(updatedUser.business_unit).toEqual(BusinessUnits.PEERBR);

    await expect(
      inMemoryUsersRepository.findByEmail(collaborator.email),
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
      email: academy.email,
      responsible: admin.email,
      new_bu: BusinessUnits.GRUPOGCB,
    });
    expect(updatedUser.business_unit).toEqual(BusinessUnits.GRUPOGCB);

    await expect(
      inMemoryUsersRepository.findByEmail(academy.email),
    ).resolves.toEqual(
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
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        responsible: admin.email,
        new_bu: BusinessUnits.GRUPOGCB,
      }),
    ).rejects.toThrow('Usuário ou responsável não existem!');
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
        email: collaborator.email,
        responsible: '19906417-70ea-4f6a-a158-c6c6043e7919',
        new_bu: BusinessUnits.GRUPOGCB,
      }),
    ).rejects.toThrow('Usuário ou responsável não existem!');
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
        email: academy.email,
        responsible: academy.email,
        new_bu: BusinessUnits.GRUPOGCB,
      }),
    ).rejects.toThrow('Sem autorização!');
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
        email: collaborator.email,
        responsible: collaborator.email,
        new_bu: BusinessUnits.ADIANTE,
      }),
    ).rejects.toThrow('Usuário já pertence a essa unidade de negócio!');
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
        email: collaboratorTwo.email,
        responsible: collaborator.email,
        new_bu: BusinessUnits.ADIANTE,
      }),
    ).rejects.toThrow(
      'Colaboradores somente podem editar sua própria unidade de negócio!',
    );
  });
});
