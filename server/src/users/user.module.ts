import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '@shared/infra/http/controllers/users.controller';
import { User } from '@users/infra/entities/user.entity';
import { UsersRepository } from '@users/infra/repositories/users.repository';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';
import { RegisterUser, FindById } from '@users/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    RegisterUser,
    FindById,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepository],
})
export class UsersModule {}
