import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Roles } from '@shared/constants';
import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';
import { FindByEmail } from '@users/use-cases/findByEmail/find-by-email';

@Injectable()
export class RegisterTransaction {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: RegisterTransactionDTO): Promise<Transaction> {
    const findByEmail = new FindByEmail(this.usersRepository);
    const responsible = findByEmail.execute(data.responsible);
    if ((await responsible).role == Roles.COLLABORATOR) {
      throw new UnauthorizedException('You do not have permission');
    }
    return this.transactionsRepository.register(data);
  }
}
