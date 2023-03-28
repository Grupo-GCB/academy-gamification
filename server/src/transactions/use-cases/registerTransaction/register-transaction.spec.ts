import {
  BusinessUnits,
  CollaborationsSubType,
  RedeemSubType,
  Roles,
  Status,
  Types,
} from '@shared/constants';
import { InMemoryTransactionsRepository } from '@transactions/test/in-memory';
import { RegisterTransaction } from '@transactions/use-cases';
import { InMemoryUsersRepository } from '@users/test/in-memory';

describe('Register a transaction', () => {
  let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  let sut: RegisterTransaction;

  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new RegisterTransaction(
      inMemoryTransactionsRepository,
      inMemoryUsersRepository,
    );
  });

  it('should be able to register a collaboration if responsible is an academy', async () => {
    const academy = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    const transaction = await sut.execute({
      user: academy.id,
      responsible: academy.id,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.PENDING,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        sub_type: transaction.sub_type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should not be able to register a collaboration if responsible is a collaborator', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        user: collaborator.id,
        responsible: collaborator.id,
        type: Types.COLLABORATION,
        sub_type: CollaborationsSubType.CODEREVIEW,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should not be able to register a penalty if responsible is an academy', async () => {
    const academy = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });
    await expect(
      sut.execute({
        user: academy.id,
        responsible: academy.id,
        type: Types.PENALTY,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should not be able to register a redeem if responsible is an academy', async () => {
    const academy = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });
    await expect(
      sut.execute({
        user: academy.id,
        responsible: academy.id,
        type: Types.REDEEM,
        sub_type: RedeemSubType.PEERCREDIT,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should not be able to register a correction if responsible is an academy', async () => {
    const academy = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    await expect(
      sut.execute({
        user: academy.id,
        responsible: academy.id,
        type: Types.CORRECTION,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should not be able to register a transfer if responsible is an academy', async () => {
    const academy = await inMemoryUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ACADEMY,
    });

    await expect(
      sut.execute({
        user: academy.id,
        responsible: academy.id,
        type: Types.TRANSFER,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should be able to register a redeem if responsible is a collaborator', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await sut.execute({
      user: collaborator.id,
      responsible: collaborator.id,
      type: Types.REDEEM,
      sub_type: RedeemSubType.ACADEMY,
      status: Status.PENDING,
      gcbits: 50000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        sub_type: transaction.sub_type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should be able to register a transfer if responsible is a collaborator', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await sut.execute({
      user: collaborator.id,
      responsible: collaborator.id,
      type: Types.TRANSFER,
      status: Status.PENDING,
      gcbits: 2000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should not be able to register a penalty if responsible is a collaborator', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        user: collaborator.id,
        responsible: collaborator.id,
        type: Types.PENALTY,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should not be able to register a correction if responsible is a collaborator', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        user: collaborator.id,
        responsible: collaborator.id,
        type: Types.CORRECTION,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('You do not have permission');
  });

  it('should not be able to register a transaction if user does not exist', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    await expect(
      sut.execute({
        user: 'c76ac552-e9fb-4556-9876-479c78811ffa',
        responsible: admin.id,
        type: Types.CORRECTION,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('User or responsible does not exist');
  });

  it('should not be able to register a transaction if responsible does not exist', async () => {
    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    await expect(
      sut.execute({
        user: collaborator.id,
        responsible: 'd4ebf6d8-7344-488f-8c98-58b6e4eaadcb',
        type: Types.CORRECTION,
        status: Status.PENDING,
        gcbits: 3000,
      }),
    ).rejects.toThrow('User or responsible does not exist');
  });

  it('should be able to register a collaboration if responsible is an administrator', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await sut.execute({
      user: collaborator.id,
      responsible: admin.id,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        sub_type: transaction.sub_type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should be able to register a penalty if responsible is an administrator', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await sut.execute({
      user: collaborator.id,
      responsible: admin.id,
      type: Types.PENALTY,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should be able to register a redeem if responsible is an administrator', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await sut.execute({
      user: collaborator.id,
      responsible: admin.id,
      type: Types.REDEEM,
      sub_type: RedeemSubType.COMPLEXPROJECT,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        sub_type: transaction.sub_type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should be able to register a correction if responsible is an administrator', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await sut.execute({
      user: collaborator.id,
      responsible: admin.id,
      type: Types.CORRECTION,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });

  it('should be able to register a transfer if responsible is an administrator', async () => {
    const admin = await inMemoryUsersRepository.create({
      name: 'Kayke',
      email: 'kayke.fujinaka@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ACADEMY,
      role: Roles.ADMIN,
    });

    const collaborator = await inMemoryUsersRepository.create({
      name: 'Levi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const transaction = await sut.execute({
      user: collaborator.id,
      responsible: admin.id,
      type: Types.TRANSFER,
      status: Status.APPROVED,
      gcbits: 3000,
    });

    expect(transaction).toEqual(
      expect.objectContaining({
        id: transaction.id,
        user: transaction.user,
        responsible: transaction.responsible,
        type: transaction.type,
        status: transaction.status,
        gcbits: transaction.gcbits,
      }),
    );
  });
});
