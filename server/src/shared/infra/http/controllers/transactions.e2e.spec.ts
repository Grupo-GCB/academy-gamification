import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import {
  FilterTransactionsByStatus,
  RegisterTransaction,
} from '@transactions/use-cases';
import {
  BusinessUnits,
  CollaborationsStatus,
  TransactionReasons,
} from '@shared/constants';

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

  const filterTransactionsByStatus = {
    execute: () => ({
      status: CollaborationsStatus.PENDING,
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
      .overrideProvider(FilterTransactionsByStatus)
      .useValue(filterTransactionsByStatus)
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

  describe('Filter transactions by status', () => {
    it('should return an array of transactions', () => {
      return request(app.getHttpServer())
        .get('/transactions/?status=pending')
        .expect(200)
        .expect(filterTransactionsByStatus.execute());
    });
  });
});
