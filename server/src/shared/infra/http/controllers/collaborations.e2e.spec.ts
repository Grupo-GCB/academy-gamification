import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from './../../../../app.module';
import { FindByStatus } from '@collaborations/use-cases';
import { CollaborationsStatus } from '@shared/constants';

describe('Collaborations Controller', () => {
  const findByStatus = {
    execute: () => ({
      status: CollaborationsStatus.PENDING,
    }),
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FindByStatus)
      .useValue(findByStatus)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Find collaborations by status', () => {
    it('should return a array of collaborations', () => {
      return request(app.getHttpServer())
        .get('/collaborations/?status=pending')
        .expect(200)
        .expect(findByStatus.execute());
    });

    it('should return 404 status code if no collaboration with passed status is found', () => {
      return request(app.getHttpServer())
        .get('/collaborations/?status=approved')
        .expect(404)
        .expect(findByStatus.execute());
    });
  });
});
