import { Injectable } from '@nestjs/common';

import { UserRoles } from '@shared/constants';
import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';
import { FindById } from '@users/use-cases/findById/find-by-id';

@Injectable()
export class RegisterTransaction {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: RegisterTransactionDTO): Promise<Transaction> {
    const findById = new FindById(this.usersRepository);
    const user = findById.execute(data.user_id);
    if ((await user).role == UserRoles.COLLABORATOR) {
      throw new Error('Collaborators are not able to record transactions');
    }
    return this.transactionsRepository.register(data);
  }
}
