import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy, LocalStrategy } from '@auth/strategies';
import { AuthController } from '@shared/infra/http/controllers/auth.controller';
import { UsersModule } from '@users/user.module';
import { AuthService } from '@auth/auth.service';
import { FindByEmail } from '@users/use-cases';
import { RevokedTokenRepository } from '@auth/infra/typeorm/repositories/revoked-token.repository';
import { RefreshTokenRepository } from '@auth/infra/typeorm/repositories/refresh-token.repository';
import { RevokedToken } from './infra/typeorm/entities/revoked-token.entity';
import { RefreshToken } from './infra/typeorm/entities/refresh-token.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'chave-secreta',
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
    RefreshTokenRepository,
    RevokedTokenRepository,
  ],
})
export class AuthModule {}
