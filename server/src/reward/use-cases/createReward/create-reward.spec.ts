import { InMemoryRewardsRepository } from '@reward/test/in-memory/InMemoryRewardRepository';
import { CreateReward } from '@reward/use-cases';

describe('Create reward', () => {
  let inMemoryRewardsRepository: InMemoryRewardsRepository;
  let sut: CreateReward;

  beforeEach(() => {
    inMemoryRewardsRepository = new InMemoryRewardsRepository();

    sut = new CreateReward(inMemoryRewardsRepository);
  });

  it('should be able to create a reward', async () => {
    const reward = await sut.execute({
      name: 'Créditos PeerBr',
      description: 'Créditos que podem ser utilizados dentro do PeerBr',
      value: 50000,
    });

    expect(reward).toEqual(
      expect.objectContaining({
        name: 'Créditos PeerBr',
        description: 'Créditos que podem ser utilizados dentro do PeerBr',
        value: 50000,
      }),
    );
  });
});
