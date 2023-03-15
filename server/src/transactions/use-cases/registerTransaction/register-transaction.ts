import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Reasons, Roles } from '@shared/constants';
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

    if (
      responsible.role == Roles.COLLABORATOR &&
      data.reason != Reasons.REEDEM
    ) {
      throw new UnauthorizedException('You do not have permission');
    }
    if (
      responsible.role == Roles.ACADEMY &&
      data.reason != Reasons.COLLABORATION
    ) {
      throw new UnauthorizedException('You do not have permission');
    }
    return this.transactionsRepository.register(data);
  }
}
