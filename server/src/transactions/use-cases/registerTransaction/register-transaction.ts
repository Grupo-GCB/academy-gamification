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

  async execute({
    collaborator,
    responsible,
    reason,
    type,
    business_unit,
    status,
    gcbits,
    description,
  }: RegisterTransactionDTO): Promise<Transaction> {
    const responsiblee = await this.usersRepository.findOne(responsible);

    if (
      (responsiblee.role == Roles.COLLABORATOR && reason != Reasons.REDEEM) ||
      (responsiblee.role == Roles.ACADEMY && reason != Reasons.COLLABORATION)
    ) {
      throw new UnauthorizedException('You do not have permission');
    }

    return this.transactionsRepository.register({
      collaborator,
      responsible,
      reason,
      type,
      business_unit,
      status,
      gcbits,
      description,
    });
  }
}
