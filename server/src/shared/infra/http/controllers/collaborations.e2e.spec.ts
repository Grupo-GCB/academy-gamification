import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import {
  FindByStatus,
  FindOne,
  RegisterCollaboration,
  UpdateStatus,
} from '@collaborations/use-cases';
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

  const findOne = {
    execute: () => '10f47e61-65c0-48a3-9554-23f022750a66',
  };

  const updateStatus = {
    execute: () => ({
      collaboration_id: '10f47e61-65c0-48a3-9554-23f022750a66',
      newStatus: CollaborationsStatus.APPROVED,
    }),
  };

  let app: INestApplication;

  const registerCollaboration = {
    execute: () => ({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      collaborator_id: '1',
      status: CollaborationsStatus.PENDING,
      businnesUnity: BusinessUnits.ADIANTE,
    }),
  };

  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FindByStatus)
      .useValue(findByStatus)
      .overrideProvider(FindOne)
      .useValue(findOne)
      .overrideProvider(UpdateStatus)
      .useValue(updateStatus)
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

  describe('Find collaboration by id', () => {
    it('should return a collaboration', () => {
      return request(app.getHttpServer())
        .get('/collaborations/10f47e61-65c0-48a3-9554-23f022750a66')
        .expect(200)
        .expect(findOne.execute());
    });
  });

  describe('Update collaboration status', () => {
    it('should return an updated collaboration', () => {
      return request(app.getHttpServer())
        .put('/collaborations')
        .expect(200)
        .expect(updateStatus.execute());
    });
  });
});
