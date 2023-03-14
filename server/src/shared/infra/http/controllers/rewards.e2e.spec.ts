import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { CreateReward, FindOne, ListAllRewards } from '@reward/use-cases';
import { AppModule } from '@/app.module';

describe('Rewards Controller', () => {
  const createReward = {
    execute: () => ({
      name: 'Créditor PeerBr',
      description: 'Créditor a serem utilizados no PeerBr',
      value: 5000,
      imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
    }),
  };

  const listAllRewards = {
    execute: () => [
      {
        name: 'Projeto Simples',
        description:
          'Possibilidade de implementação de um projeto de nível simples',
        value: 10000,
        imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/450.jpg',
      },
      {
        name: 'Créditos PeerBr',
        description: 'Créditos que podem ser utilizados no PeerBr',
        value: 5000,
        imageUrl: 'https://cdn.maikoapp.com/3d4b/4quqa/150.jpg',
      },
    ],
  };

  const findOne = {
    execute: () => '10f47e61-65c0-48a3-9554-23f022750a66',
  };

  let app: INestApplication;

  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CreateReward)
      .useValue(createReward)
      .overrideProvider(ListAllRewards)
      .useValue(listAllRewards)
      .overrideProvider(FindOne)
      .useValue(findOne)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create Reward', () => {
    it('should be able to return 201 status code if create a reward', () => {
      return request(app.getHttpServer())
        .post('/rewards')
        .expect(201)
        .expect(createReward.execute());
    });
  });

  describe('List All Rewards', () => {
    it('shoud be able to return an array of rewards', async () => {
      return request(app.getHttpServer())
        .get('/rewards')
        .expect(200)
        .expect(listAllRewards.execute());
    });
  });

  describe('Find one reward', () => {
    it('should return a reward', () => {
      return request(app.getHttpServer())
        .get('/rewards/10f47e61-65c0-48a3-9554-23f022750a66')
        .expect(200)
        .expect(findOne.execute());
    });
  });
});
