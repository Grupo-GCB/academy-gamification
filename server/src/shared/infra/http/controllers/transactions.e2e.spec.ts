import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { JwtAuthGuard } from '@auth/guards';
import {
  Admins,
  CollaborationsSubType,
  RedeemSubType,
  Status,
  Types,
} from '@shared/constants';
import {
  FilterByStatus,
  FindAllTransactions,
  FindById,
  RegisterTransaction,
  UpdateStatus,
} from '@transactions/use-cases';

describe('Transaction Controller', () => {
  const registerTransaction = {
    execute: () => ({
      user: 'levi.ciarrochi@gcbinvestimentos.com',
      responsible: Admins.ADMIN,
      type: Types.COLLABORATION,
      sub_type: CollaborationsSubType.CODEREVIEW,
      status: Status.APPROVED,
      gcbits: 3000,
    }),
  };

  const findById = {
    execute: () => '648a036a-8fc7-4778-84ca-e73e79edb068',
  };

  const findAllTransactions = {
    execute: () => [
      {
        user: 'levi.ciarrochi@gcbinvestimentos.com',
        responsible: Admins.ADMIN,
        type: Types.COLLABORATION,
        sub_type: CollaborationsSubType.CODEREVIEW,
        status: Status.PENDING,
        gcbits: 5000,
      },
      {
        user: 'flavio.marques@gcbinvestimentos.com',
        responsible: Admins.ADMIN,
        type: Types.REDEEM,
        sub_type: RedeemSubType.ACADEMY,
        status: Status.PENDING,
        gcbits: -50000,
      },
    ],
  };

  const updateStatus = {
    execute: () => ({
      id: '10f47e61-65c0-48a3-9554-23f022750a66',
      new_status: Status.APPROVED,
    }),
  };

  const filterByStatus = {
    execute: () => [
      {
        user: 'levi.ciarrochi@gcbinvestimentos.com',
        responsible: Admins.ADMIN,
        type: Types.COLLABORATION,
        sub_type: CollaborationsSubType.CODEREVIEW,
        status: Status.PENDING,
        gcbits: 5000,
      },
      {
        user: 'flavio.marques@gcbinvestimentos.com',
        responsible: Admins.ADMIN,
        type: Types.REDEEM,
        sub_type: RedeemSubType.ACADEMY,
        status: Status.PENDING,
        gcbits: -50000,
      },
    ],
  };

  const jwtAuthGuard = {
    canActivate: () => true,
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
      .overrideProvider(FilterByStatus)
      .useValue(filterByStatus)
      .overrideProvider(FindAllTransactions)
      .useValue(findAllTransactions)
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtAuthGuard)
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

  describe('Find all transactions', () => {
    it('should return an array of transactions', () => {
      return request(app.getHttpServer())
        .get('/transactions')
        .expect(200)
        .expect(findAllTransactions.execute());
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

  describe('Filter transactions by status', () => {
    it('should return an array of transactions', () => {
      return request(app.getHttpServer())
        .get('/transactions/?status=pending')
        .expect(200)
        .expect(filterByStatus.execute());
    });
  });
});
