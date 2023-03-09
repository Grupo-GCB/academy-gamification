import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';
import {
  FindById,
  RegisterTransaction,
  UpdateStatus,
} from '@transactions/use-cases';

describe('Transaction Controller', () => {
  const registerTransaction = {
    execute: () => ({
      collaborator_id: '08695ca2-1f95-4383-b92f-7e44fb8bd950',
      business_unit: BusinessUnits.ADIANTE,
      reason: TransactionReasons.COLLABORATION,
      type: 'Code_Review',
      academys: [
        'c13f866c-2ba0-42b7-83c9-50bb61c5c167',
        '70c2be1a-ef21-4ae7-a8d0-375ddf026920',
      ],
      status: CollaborationsStatus.APPROVED,
      gcbits: 5000,
    }),
  };

  const findById = {
    execute: () => '648a036a-8fc7-4778-84ca-e73e79edb068',
  };

  const updateStatus = {
    execute: () => ({
      id: '10f47e61-65c0-48a3-9554-23f022750a66',
      newStatus: CollaborationsStatus.APPROVED,
    }),
  };

  let app: INestApplication;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RegisterTransaction)
      .useValue(registerTransaction)
      .overrideProvider(FindById)
      .useValue(findById)
      .overrideProvider(UpdateStatus)
      .useValue(updateStatus)
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
        .post('/transactions/register')
        .expect(201)
        .expect(registerTransaction.execute());
    });
  });

  describe('Find transaction by id', () => {
    it('should return a collaboration', () => {
      return request(app.getHttpServer())
        .get('/transactions/648a036a-8fc7-4778-84ca-e73e79edb068')
        .expect(200)
        .expect(findById.execute());
    });
  });

  describe('Update transaction status', () => {
    it('should return an updated transaction', () => {
      return request(app.getHttpServer())
        .put('/transactions')
        .expect(200)
        .expect(updateStatus.execute());
    });
  });
});
