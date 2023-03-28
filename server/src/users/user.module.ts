import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '@shared/infra/http/controllers';
import { TransactionsModule } from '@transactions/transactions.module';
import { User } from '@users/infra/entities';
import { UsersRepository } from '@users/infra/repositories';
import { IUsersRepository } from '@users/interfaces';
import {
  DeleteUser,
  FindByEmail,
  FindById,
  GetGCBitsBalance,
  ListAllUsers,
  RegisterUser,
  UpdateBusinessUnit,
  UpdatePassword,
} from '@users/use-cases';

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
