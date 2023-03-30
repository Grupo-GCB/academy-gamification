import { BadRequestException, Injectable } from '@nestjs/common';

import { Status } from '@shared/constants';
import { isUuidValid } from '@shared/utils';
import { FilterTransactionsByUserDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';
import { User } from '@users/infra/entities';
import { IGCBitsBalance, IUsersRepository } from '@users/interfaces';

@Injectable()
export class GetGCBitsBalance {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user,
  }: FilterTransactionsByUserDTO): Promise<IGCBitsBalance> {
    if (!isUuidValid(user)) throw new BadRequestException('Id inválido!');

    const userFound: User = await this.usersRepository.findById(user);

    if (!userFound) {
      throw new BadRequestException('Usuário não encontrado!');
    }

    const transactions: Transaction[] =
      await this.transactionsRepository.filterByUser({
        user,
      });

    const balance: number = transactions.reduce(
      (total: number, transaction: Transaction) => {
        if (transaction.status === Status.APPROVED) total += transaction.gcbits;
        return total;
      },
      0,
    );

    return { balance };
  }
}
