import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { JwtAuthGuard } from '@auth/guards';
import { BusinessUnits, Roles } from '@shared/constants';
import {
  DeleteUser,
  FilterByRole,
  FindByEmail,
  FindById,
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

  const findById = {
    execute: () => '791f78a4-2f05-4313-8124-e8ae5f4421a0',
  };

  const findByEmail = {
    execute: () => '791f78a4-2f05-4313-8124-e8ae5f4421a0',
  };

  const jwtAuthGuard = {
    canActivate: () => true,
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
      password: 'current_password',
      new_password: 'new_password',
      confirm_new_password: 'new_password',
    }),
  };

  const deleteUser = { execute: () => 200 };

  const filterByRole = {
    execute: () => [
      {
        name: 'Kayke',
        email: 'kayke.fujinaka@gcbinvestimentos.com',
        password: 'admin123',
        business_unit: BusinessUnits.ACADEMY,
        role: Roles.ADMIN,
      },
    ],
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
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtAuthGuard)
      .overrideProvider(UpdateBusinessUnit)
      .useValue(updateBusinessUnit)
      .overrideProvider(DeleteUser)
      .useValue(deleteUser)
      .overrideProvider(UpdatePassword)
      .useValue(updatePassword)
      .overrideProvider(FilterByRole)
      .useValue(filterByRole)
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

  describe('Update business unit', () => {
    it('should return an updated business unit user', () => {
      return request(app.getHttpServer())
        .put('/users/change-bu')
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

  describe('Update user password', () => {
    it('should be able to update user password', () => {
      return request(app.getHttpServer())
        .put('/users/change-password')
        .expect(200)
        .expect(updatePassword.execute());
    });
  });

  describe('Filter users by role', () => {
    it('should return an array of users', () => {
      return request(app.getHttpServer())
        .get('/users/filter/users-by-role/?role=ADMIN')
        .expect(200)
        .expect(filterByRole.execute());
    });
  });
});
