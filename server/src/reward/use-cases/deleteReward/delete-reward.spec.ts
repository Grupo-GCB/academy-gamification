import { NotFoundException } from '@nestjs/common';
import { InMemoryRewardsRepository } from '@reward/test/in-memory/InMemoryRewardRepository';
import { DeleteReward } from '@reward/use-cases';

describe('Delete reward', () => {
  let inMemoryRewardsRepository: InMemoryRewardsRepository;
  let sut: DeleteReward;

  beforeEach(() => {
    inMemoryRewardsRepository = new InMemoryRewardsRepository();
    sut = new DeleteReward(inMemoryRewardsRepository);
  });

  it('should be able to delete a reward', async () => {
    const reward = await inMemoryRewardsRepository.create({
      name: 'Créditos PeerBr',
      description: 'Créditos que podem ser utilizados dentro do PeerBr',
      value: 50000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
    });

    await sut.execute(reward.id);

    await expect(inMemoryRewardsRepository.findOne(reward.id)).resolves.toEqual(
      expect.objectContaining({ deletedAt: expect.any(Date) }),
    );
  });

  it('should not be able to delete a non existing reward', async () => {
    await expect(
      async () => await sut.execute('0a8ccabb-2937-463e-9c37-d672235564b1'),
    ).rejects.toEqual(new NotFoundException('Reward does not exist'));
  });
});
