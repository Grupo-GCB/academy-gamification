import { AppModule } from '@/app.module';
import { UpdateGcbits } from '@collaborator/use-cases';
import { RegisterCollaborator } from '@collaborator/use-cases/registerCollaborator/register-collaborator';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('Collaborator Controller', () => {
  const registerCollaborator = {
    execute: () => ({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      passowrd: 'johndoe123',
    }),
  };

  const updateGcbits = {
    execute: () => ({
      id: '633b800d-cbe9-44a5-b7e2-13d175cc1efe',
      gcbits: 3000,
    }),
  };

  let app: INestApplication;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RegisterCollaborator)
      .useValue(registerCollaborator)
      .overrideProvider(UpdateGcbits)
      .useValue(updateGcbits)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Register collaborador', () => {
    it('should be able to return a 201 status if create collaborator', () => {
      return request(app.getHttpServer())
        .post('/collaborators')
        .expect(201)
        .expect(registerCollaborator.execute());
    });
  });

  describe('Update collaborator gcbits', () => {
    it('should return an updated gcbits', () => {
      return request(app.getHttpServer())
        .put('/collaborators/updateGcbits')
        .expect(200)
        .expect(updateGcbits.execute());
    });
  });
});
