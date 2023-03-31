import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { JwtAuthGuard, RefreshTokenGuard } from '@auth/guards';
import { Login, Logout, Refresh } from '@auth/use-cases';

describe('Auth Controller', () => {
  const loginUser = {
    execute: () => ({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOGQxOTUyMS1hNzU4LTQyMWEtOGNmZS04MzlhZTY0YzE0OGUiLCJlbWFpbCI6InZpdG9yLmZyZWl0YXNAZ2NiaW52ZXN0aW1lbnRvcy5jb20iLCJidSI6IkFESUFOVEUiLCJyb2xlIjoiQUNBREVNWSIsImlhdCI6MTY4MDIxNTg5OCwiZXhwIjoxNjgwMjE2NDk4fQ.sCSFq6zIxm-BuexhNCotLrIrUDZjgWqdmjgMvqtMPWM',
      refreshToken:
        '3e38aaf25877849d86b2bc5998a1947d3778c6b893177ca604359fa638d24e5a',
    }),
  };

  const refreshToken = {
    execute: () => ({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOGQxOTUyMS1hNzU4LTQyMWEtOGNmZS04MzlhZTY0YzE0OGUiLCJlbWFpbCI6InZpdG9yLmZyZWl0YXNAZ2NiaW52ZXN0aW1lbnRvcy5jb20iLCJidSI6IkFESUFOVEUiLCJyb2xlIjoiQUNBREVNWSIsImlhdCI6MTY4MDIxNTg5OCwiZXhwIjoxNjgwMjE2NDk4fQ.sCSFq6zIxm-BuexhNCotLrIrUDZjgWqdmjgMvqtMPWM',
      refreshToken:
        '3e38aaf25877849d86b2bc5998a1947d3778c6b893177ca604359fa638d24e5a',
    }),
  };

  const logoutUser = {
    execute: () => undefined,
  };

  const jwtAuthGuard = {
    canActivate: () => true,
  };

  const refreshTokenGuard = {
    canActivate: () => true,
  };

  let app: INestApplication;
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Login)
      .useValue(loginUser)
      .overrideProvider(Refresh)
      .useValue(refreshToken)
      .overrideProvider(Logout)
      .useValue(logoutUser)
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtAuthGuard)
      .overrideGuard(RefreshTokenGuard)
      .useValue(refreshTokenGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Login', () => {
    it('should be able to return a 200 status and an access and refresh token', () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({
          email: 'vitor.freitas@gcbinvestimentos.com',
          password: 'gcb123',
        })
        .expect(200)
        .expect(loginUser.execute());
    });
  });

  describe('Refresh', () => {
    it('should be able to return a 200 status and a new access and refresh token', () => {
      return request(app.getHttpServer())
        .post('/refresh')
        .send({
          refreshToken:
            '3e38aaf25877849d86b2bc5998a1947d3778c6b893177ca604359fa638d24e5a',
        })
        .expect(200)
        .expect(refreshToken.execute());
    });
  });

  describe('Logout', () => {
    it('should be able to return a 204 status after logging out', () => {
      return request(app.getHttpServer())
        .post('/logout')
        .send({
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOGQxOTUyMS1hNzU4LTQyMWEtOGNmZS04MzlhZTY0YzE0OGUiLCJlbWFpbCI6InZpdG9yLmZyZWl0YXNAZ2NiaW52ZXN0aW1lbnRvcy5jb20iLCJidSI6IkFESUFOVEUiLCJyb2xlIjoiQUNBREVNWSIsImlhdCI6MTY4MDIxNTg5OCwiZXhwIjoxNjgwMjE2NDk4fQ.sCSFq6zIxm-BuexhNCotLrIrUDZjgWqdmjgMvqtMPWM',
        })
        .expect(204);
    });
  });
});
