import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '@shared/constants';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { RegisterUser } from '@users/use-cases';

describe('Users Controller', () => {
  const registerUser = {
    execute: () => ({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      passowrd: 'johndoe123',
      role: Roles.ADMIN,
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
        .post('/users')
        .expect(201)
        .expect(registerUser.execute());
    });
  });
});
