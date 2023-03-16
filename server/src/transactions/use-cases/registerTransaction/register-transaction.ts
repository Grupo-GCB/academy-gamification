import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Roles, Types } from '@shared/constants';
import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class RegisterTransaction {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: RegisterTransactionDTO): Promise<Transaction> {
    const responsible = await this.usersRepository.findOne(data.responsible);
    const user = await this.usersRepository.findOne(data.user);

    if (!responsible || !user)
      throw new BadRequestException('User or responsible does not exist');

    const permissions = {
      [Roles.COLLABORATOR]: [Types.REDEEM, Types.TRANSFER],
      [Roles.ACADEMY]: [Types.COLLABORATION],
    };

    const isAdmin = responsible.role === Roles.ADMIN;

    const hasPermission =
      (isAdmin || permissions[responsible.role]?.includes(data.type)) ?? false;

    if (!hasPermission) {
      throw new UnauthorizedException('You do not have permission');
    }

    data.type == Types.COLLABORATION || data.type == Types.TRANSFER
      ? (data.gcbits = data.gcbits)
      : (data.gcbits = -data.gcbits);
    return this.transactionsRepository.register(data);
  }
}
