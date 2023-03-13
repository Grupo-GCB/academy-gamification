import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { CreateReward } from '@reward/use-cases';

describe('Rewards Controller', () => {
  const createReward = {
    execute: () => ({
      name: 'Créditor PeerBr',
      description: 'Créditor a serem utilizados no PeerBr',
      value: 5000,
    }),
  };

  let app: INestApplication;

  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CreateReward)
      .useValue(createReward)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create Reward', () => {
    it('should be albe to return 201 status code if create a reward', () => {
      return request(app.getHttpServer())
        .post('/rewards')
        .expect(201)
        .expect(createReward.execute());
    });
  });
});
