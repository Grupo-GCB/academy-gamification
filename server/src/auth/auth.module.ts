import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LoginValidationMiddleware } from '@auth/middlewares';
import { JwtStrategy, LocalStrategy } from '@auth/strategies';
import { AuthController } from '@shared/infra/http/controllers/auth.controller';
import { UsersModule } from '@users/user.module';
import { AuthService } from '@auth/auth.service';
import { FindByEmail } from '@users/use-cases';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'chave-secreta',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, FindByEmail],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
