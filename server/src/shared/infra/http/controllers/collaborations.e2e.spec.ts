import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { FindByStatus, RegisterCollaboration } from '@collaborations/use-cases';
import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
} from '@shared/constants';

describe('Collaborations Controller', () => {
  const findByStatus = {
    execute: () => ({
      status: CollaborationsStatus.PENDING,
    }),
  };

  const registerCollaboration = {
    execute: () => ({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      collaborator_id: '1',
      status: CollaborationsStatus.PENDING,
      businnesUnity: BusinessUnits.ADIANTE,
    }),
  };

  let app: INestApplication;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FindByStatus)
      .useValue(findByStatus)
      .overrideProvider(RegisterCollaboration)
      .useValue(registerCollaboration)
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
        .expect((res) => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('Register collaboration', () => {
    it('should be able to return a 201 status if create collaboration', () => {
      return request(app.getHttpServer())
        .post('/collaborations')
        .expect(201)
        .expect(registerCollaboration.execute());
    });
  });
});
