import { InMemoryWalletsRepository } from '@collaborator/test/in-memory/inMemoryWalletsRepository';
import { UpdateGcbits } from '@collaborator/use-cases';

describe('Update gcbits value in an wallet', () => {
  let inMemoryWalletsRepository: InMemoryWalletsRepository;
  let sut: UpdateGcbits;

  beforeEach(() => {
    inMemoryWalletsRepository = new InMemoryWalletsRepository();
    sut = new UpdateGcbits(inMemoryWalletsRepository);
  });

  it('should be able to update an gcbits value in wallet', async () => {
    const wallet = await inMemoryWalletsRepository.create({
      collaborator_id: '6817de1c-e16d-4f4c-8387-cbc2eaadbda2',
      gcbits: 3000,
    });

    const updatedWallet = await sut.execute({ id: wallet.id, gcbits: 1000 });

    expect(updatedWallet.gcbits).toEqual(4000);
  });
});
