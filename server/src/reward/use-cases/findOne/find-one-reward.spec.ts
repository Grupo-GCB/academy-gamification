import { InMemoryRewardsRepository } from '@reward/test/in-memory/InMemoryRewardRepository';
import { FindOne } from '@reward/use-cases';

describe('Find one reward', () => {
  let inMemoryRewardsRepository: InMemoryRewardsRepository;
  let sut: FindOne;

  beforeEach(() => {
    inMemoryRewardsRepository = new InMemoryRewardsRepository();
    sut = new FindOne(inMemoryRewardsRepository);
  });

  it('should be able to find a reward that matches the given id', async () => {
    const rewardOne = await inMemoryRewardsRepository.create({
      name: 'Créditos PeerBr',
      description: 'Créditos que podem ser utilizados dentro do PeerBr',
      value: 50000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
    });

    const rewardTwo = await inMemoryRewardsRepository.create({
      name: 'Projeto Simples',
      description:
        'Possibilidade de implementação de um projeto de nível simples',
      value: 10000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/450.jpg',
    });

    const reward = await sut.execute(rewardOne.id);

    expect(reward).not.toEqual(rewardTwo);
    expect(reward).toEqual(
      expect.objectContaining({
        name: 'Créditos PeerBr',
        description: 'Créditos que podem ser utilizados dentro do PeerBr',
        value: 50000,
        imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
      }),
    );
  });

  it('should not be able to find a nonexistent reward', async () => {
    await expect(async () => {
      await sut.execute('edee8ffa-7c91-46f0-9fa6-4229f9b76768');
    }).rejects.toThrow('Reward does not exist');
  });
});
