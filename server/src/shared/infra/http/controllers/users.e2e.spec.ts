import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { BusinessUnits, Roles } from '@shared/constants';
import { AppModule } from '@/app.module';
import {
  DeleteUser,
  RegisterUser,
  UpdateBusinessUnit,
  UpdatePassword,
} from '@users/use-cases';

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

  const updatePassword = {
    execute: () => ({
      id: '093efa1e-8506-43a9-b2c0-c6b713591bb3',
      new_password: 'new_password',
    }),
  };

  const deleteUser = { execute: () => 200 };

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
      .overrideProvider(DeleteUser)
      .useValue(deleteUser)
      .overrideProvider(UpdatePassword)
      .useValue(updatePassword)
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

  describe('Delete an user', () => {
    it('should return a 200 status when an user is deleted', () => {
      return request(app.getHttpServer())
        .delete('/users/123456')
        .expect(200)
        .expect(deleteUser.execute());
    });
  });

  describe('Update an user password', () => {
    it('should return an user password', () => {
      return request(app.getHttpServer())
        .put('/users/changePassword')
        .expect(200)
        .expect(updatePassword.execute());
    });
  });
});
