import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '@shared/infra/http/controllers/users.controller';
import { TransactionsModule } from '@transactions/transactions.module';
import { User } from '@users/infra/entities';
import { UsersRepository } from '@users/infra/repositories';
import { IUsersRepository } from '@users/interfaces';
import { AuthModule } from '@auth/auth.module';

import {
  DeleteUser,
  FilterByRole,
  FindByEmail,
  FindById,
  GetGCBitsBalance,
  ListAllUsers,
  RegisterUser,
  UpdateUserBusinessUnit,
  UpdateUserPassword,
} from '@users/use-cases';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TransactionsModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    RegisterUser,
    FindById,
    ListAllUsers,
    UpdateUserBusinessUnit,
    DeleteUser,
    FindByEmail,
    UpdateUserPassword,
    GetGCBitsBalance,
    FilterByRole,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepository],
})
export class UsersModule {}
