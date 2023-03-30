import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { AuthService } from '@auth/auth.service';
import { RefreshTokenRepository } from '@auth/infra/typeorm/repositories/refresh-token.repository';
import { RevokedTokenRepository } from '@auth/infra/typeorm/repositories/revoked-token.repository';
import { JwtStrategy, LocalStrategy } from '@auth/strategies';
import { AuthController } from '@shared/infra/http/controllers/auth.controller';
import { FindByEmail, FindById } from '@users/use-cases';
import { UsersModule } from '@users/user.module';
import { RefreshToken } from './infra/typeorm/entities/refresh-token.entity';
import { RevokedToken } from './infra/typeorm/entities/revoked-token.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    TypeOrmModule.forFeature([RevokedToken, RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    FindByEmail,
    FindById,
    RefreshTokenRepository,
    RevokedTokenRepository,
  ],
})
export class AuthModule {}
