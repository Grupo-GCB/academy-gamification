import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from './../../../../app.module';
import { FindByStatus, FindOne, UpdateStatus } from '@collaborations/use-cases';
import { CollaborationsStatus } from '@shared/constants';

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

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FindByStatus)
      .useValue(findByStatus)
      .overrideProvider(FindOne)
      .useValue(findOne)
      .overrideProvider(UpdateStatus)
      .useValue(updateStatus)
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
