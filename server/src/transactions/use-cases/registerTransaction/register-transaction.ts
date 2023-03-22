import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Roles, Status, Types } from '@shared/constants';
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
    const responsible = await this.usersRepository.findById(data.responsible);
    const user = await this.usersRepository.findById(data.user);

    if (!responsible || !user)
      throw new BadRequestException('User or responsible does not exist');

    const typesPermissions = {
      [Roles.COLLABORATOR]: [Types.REDEEM, Types.TRANSFER],
      [Roles.ACADEMY]: [Types.COLLABORATION],
    };

    const isAdmin = responsible.role === Roles.ADMIN;

    const hasTypePermission =
      (isAdmin || typesPermissions[responsible.role]?.includes(data.type)) ??
      false;

    if (!hasTypePermission) {
      throw new UnauthorizedException('You do not have permission');
    }

    const statusPermissions = {
      [Roles.COLLABORATOR]: [Status.PENDING],
      [Roles.ACADEMY]: [Status.PENDING],
      [Roles.ADMIN]: [Status.APPROVED],
    };

    const hasStatusPermission =
      statusPermissions[responsible.role]?.includes(data.status) ?? false;

    if (!hasStatusPermission) {
      throw new UnauthorizedException(
        'You can not register a transaction with this status',
      );
    }

    data.type == Types.COLLABORATION || data.type == Types.TRANSFER
      ? (data.gcbits = data.gcbits)
      : (data.gcbits = -data.gcbits);
    return this.transactionsRepository.register(data);
  }
}
