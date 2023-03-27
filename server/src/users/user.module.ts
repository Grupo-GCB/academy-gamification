import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '@shared/infra/http/controllers/users.controller';
import { TransactionsModule } from '@transactions/transactions.module';
import { User } from '@users/infra/entities/user.entity';
import { UsersRepository } from '@users/infra/repositories/users.repository';
import { IUsersRepository } from './interfaces';
import {
  DeleteUser,
  FindByEmail,
  FindById,
  GetGCBitsBalance,
  ListAllUsers,
  RegisterUser,
  UpdateBusinessUnit,
  UpdatePassword,
} from './use-cases';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TransactionsModule),
  ],
  controllers: [UsersController],
  providers: [
    RegisterUser,
    FindById,
    ListAllUsers,
    UpdateBusinessUnit,
    DeleteUser,
    FindByEmail,
    UpdatePassword,
    GetGCBitsBalance,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepository],
})
export class UsersModule {}
