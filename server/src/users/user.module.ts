import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '@shared/infra/http/controllers/users.controller';
import { TransactionsModule } from '@transactions/transactions.module';
import { User } from '@users/infra/entities/user.entity';
import { UsersRepository } from '@users/infra/repositories/users.repository';
import { IUsersRepository } from './interfaces';
import {
  DeleteUser,
  FilterByRole,
  FindByEmail,
  FindById,
  GetGCBitsBalance,
  ListAllUsers,
  RegisterUser,
  UpdatePassword,
  UpdateUserBusinessUnit,
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
    UpdateUserBusinessUnit,
    DeleteUser,
    FindByEmail,
    UpdatePassword,
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
