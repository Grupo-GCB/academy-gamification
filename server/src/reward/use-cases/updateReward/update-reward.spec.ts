import { NotFoundException } from '@nestjs/common';
import { UpdateReward } from '@reward/use-cases';
import { InMemoryRewardsRepository } from '@reward/test/in-memory/InMemoryRewardRepository';

describe('Update reward', () => {
  let inMemoryRewardsRepository: InMemoryRewardsRepository;
  let sut: UpdateReward;

  beforeEach(() => {
    inMemoryRewardsRepository = new InMemoryRewardsRepository();
    sut = new UpdateReward(inMemoryRewardsRepository);
  });

  it('should be able to update reward info', async () => {
    const reward = await inMemoryRewardsRepository.create({
      name: 'Projeto Simples',
      description:
        'Possibilidade de implementação de um projeto de nível simples',
      value: 10000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/450.jpg',
    });

    const id = reward.id;

    const newInfo = {
      name: 'Créditos PeerBr',
      description: 'Créditos que podem ser utilizados no PeerBr',
      value: 5000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
    };

    const updatedReward = await sut.execute(id, newInfo);

    expect(reward.name).toEqual(newInfo.name);
    expect(reward.description).toEqual(newInfo.description);
    expect(reward.value).toEqual(newInfo.value);
    expect(reward.imageUrl).toEqual(newInfo.imageUrl);
  });

  it('should not be able to update a nonexistent reward', async () => {
    const id = '5af957c8-e231-4bc9-9f90-d14aebf8caad';
    const reward = {
      name: 'Academy',
      description: 'Academy para integrar seu squad',
      value: 50000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
    };

    await expect(sut.execute(id, reward)).rejects.toEqual(
      new NotFoundException('Reward does not exist'),
    );
  });
});
