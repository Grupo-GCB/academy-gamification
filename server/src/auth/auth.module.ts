import {
  IRefreshTokenRepository,
  IRevokedTokenRepository,
} from '@auth/interfaces';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { RefreshToken, RevokedToken } from '@auth/infra/typeorm/entities';
import {
  RefreshTokenRepository,
  RevokedTokenRepository,
} from '@auth/infra/typeorm/repositories';
import { JwtStrategy, LocalStrategy } from '@auth/strategies';
import { AuthController } from '@shared/infra/http/controllers/auth.controller';
import { FindByEmail, FindById } from '@users/use-cases';
import { UsersModule } from '@users/user.module';
import {
  Login,
  Logout,
  Refresh,
  ValidateUser,
  VerifyRefreshToken,
} from '@auth/use-cases';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    TypeOrmModule.forFeature([RevokedToken, RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [
    Login,
    Logout,
    Refresh,
    ValidateUser,
    VerifyRefreshToken,
    LocalStrategy,
    JwtStrategy,
    FindByEmail,
    FindById,
    RefreshTokenRepository,
    RevokedTokenRepository,
    {
      provide: IRefreshTokenRepository,
      useClass: RefreshTokenRepository,
    },
    {
      provide: IRevokedTokenRepository,
      useClass: RevokedTokenRepository,
    },
  ],
  exports: [RevokedTokenRepository],
})
export class AuthModule {}
