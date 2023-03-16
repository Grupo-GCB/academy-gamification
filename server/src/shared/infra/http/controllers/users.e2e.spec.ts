import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUnits, Roles } from '@shared/constants';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { FindByEmail, FindById, RegisterUser } from '@users/use-cases';

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

  const findById = {
    execute: () => '791f78a4-2f05-4313-8124-e8ae5f4421a0',
  };

  const findByEmail = {
    execute: () => 'gustavo.wuelta@gcbinvestimentos.com',
  };

  let app: INestApplication;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RegisterUser)
      .useValue(registerUser)
      .overrideProvider(FindById)
      .useValue(findById)
      .overrideProvider(FindByEmail)
      .useValue(findByEmail)
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

  describe('Find user by id', () => {
    it('should return a collaboration', () => {
      return request(app.getHttpServer())
        .get('/users/791f78a4-2f05-4313-8124-e8ae5f4421a0')
        .expect(200)
        .expect(findById.execute());
    });
  });

  describe('Find user by email', () => {
    it('should return a collaboration', () => {
      return request(app.getHttpServer())
        .get('/users/gustavo.wuelta@gcbinvestimentos.com')
        .expect(200)
        .expect(findByEmail.execute());
    });
  });
});
