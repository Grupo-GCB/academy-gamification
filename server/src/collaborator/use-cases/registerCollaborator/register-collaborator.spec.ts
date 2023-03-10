import { InMemoryCollaboratorRepository } from '@collaborator/test/in-memory/inMemoryCollaboratorRepository';
import { InMemoryWalletsRepository } from '@collaborator/test/in-memory/inMemoryWalletsRepository';
import { RegisterCollaborator } from '@collaborator/use-cases';

describe('Register collaborator', () => {
  let inMemoryCollaboratorRepository: InMemoryCollaboratorRepository;
  let inMemoryWalletRepository: InMemoryWalletsRepository;
  let sut: RegisterCollaborator;

  beforeAll(() => {
    inMemoryCollaboratorRepository = new InMemoryCollaboratorRepository();
    inMemoryWalletRepository = new InMemoryWalletsRepository();
    sut = new RegisterCollaborator(
      inMemoryCollaboratorRepository,
      inMemoryWalletRepository,
    );
  });

  it('should register a collaborator', async () => {
    const collaborator = await sut.execute({
      name: 'Gustavo',
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      password: 'gustavoWuelta123',
    });

    expect(collaborator).toEqual(
      expect.objectContaining({
        name: 'Gustavo',
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: 'gustavoWuelta123',
      }),
    );
  });
});
