import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUnits, Roles } from '@shared/constants';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { RegisterUser, UpdateBusinessUnit } from '@users/use-cases';

describe('Users Controller', () => {
  const registerUser = {
    execute: () => ({
      name: 'Admin',
      email: 'admin@gcbinvestimentos.com',
      password: 'admin123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.ADMIN,
    }),
  };

  const updateBusinessUnit = {
    execute: () => ({
      id: '10f47e61-65c0-48a3-9554-23f022750a66',
      new_bu: BusinessUnits.ADIANTE,
    }),
  };

  let app: INestApplication;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RegisterUser)
      .useValue(registerUser)
      .overrideProvider(UpdateBusinessUnit)
      .useValue(updateBusinessUnit)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Register an user', () => {
    it('should be able to return a 201 status if create user', () => {
      return request(app.getHttpServer())
        .post('/users/register')
        .expect(201)
        .expect(registerUser.execute());
    });
  });

  describe('Update business unit', () => {
    it('should return an updated business unit user', () => {
      return request(app.getHttpServer())
        .put('/users')
        .expect(200)
        .expect(updateBusinessUnit.execute());
    });
  });
});
