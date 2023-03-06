import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';

describe('Transaction Controller', () => {
  const registerTransaction = {
    execute: () => ({}),
  };

  let app: INestApplication;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RegisterTransaction)
      .useValue(registerTransaction)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Register transaction', () => {
    it('should be able to return a 201 status if create transaction', () => {
      return request(app.getHttpServer())
        .post('/transactions')
        .expect(201)
        .expect(registerTransaction.execute());
    });
  });
});
