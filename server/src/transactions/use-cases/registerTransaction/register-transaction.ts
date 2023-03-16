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

    if (
      (responsible.role == Roles.COLLABORATOR && data.type != Types.REDEEM) ||
      (responsible.role == Roles.ACADEMY && data.type != Types.COLLABORATION)
    ) {
      throw new UnauthorizedException('You do not have permission');
    }

    data.type == Types.COLLABORATION || data.type == Types.TRANSFER
      ? (data.gcbits = data.gcbits)
      : (data.gcbits = -data.gcbits);
    return this.transactionsRepository.register(data);
  }
}
