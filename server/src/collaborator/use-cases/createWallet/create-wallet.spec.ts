import { InMemoryWalletsRepository } from '@collaborator/test/in-memory/inMemoryWalletsRepository';
import { CreateWallet } from './create-wallet';

describe('Create a wallet', () => {
  let inMemoryWalletsRepository: InMemoryWalletsRepository;

  let sut: CreateWallet;

  beforeEach(() => {
    inMemoryWalletsRepository = new InMemoryWalletsRepository();

    sut = new CreateWallet(inMemoryWalletsRepository);
  });

  it('should be able to create a wallet', async () => {
    const wallet = await sut.execute({
      collaborator_id: '6817de1c-e16d-4f4c-8387-cbc2eaadbda2',
      gcbits: 3000,
    });

    expect(wallet).toEqual(
      expect.objectContaining({
        collaborator_id: '6817de1c-e16d-4f4c-8387-cbc2eaadbda2',
        gcbits: 3000,
      }),
    );
  });
});
