import { ListAllRewards } from '@reward/use-cases';
import { InMemoryRewardsRepository } from '@reward/test/in-memory/InMemoryRewardRepository';

describe('List all rewards', () => {
  let inMemoryRewardsRepository: InMemoryRewardsRepository;
  let sut: ListAllRewards;

  beforeEach(() => {
    inMemoryRewardsRepository = new InMemoryRewardsRepository();
    sut = new ListAllRewards(inMemoryRewardsRepository);
  });

  it('should be able to list all rewards', async () => {
    const rewardOne = await inMemoryRewardsRepository.create({
      name: 'Créditor PeerBr',
      description: 'Créditos que podem ser utilizados no PeerBr',
      value: 5000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
    });

    const rewardTwo = await inMemoryRewardsRepository.create({
      name: 'Projeto Simples',
      description:
        'Possibilidade de implementação de um projeto de nível simples',
      value: 10000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/450.jpg',
    });

    const rewards = await sut.execute();

    expect(rewards).toEqual(expect.arrayContaining([rewardOne, rewardTwo]));
  });

  it('should be able to return a empty array', async () => {
    const rewards = await sut.execute();

    expect(rewards).toEqual(expect.arrayContaining([]));
  });
});
