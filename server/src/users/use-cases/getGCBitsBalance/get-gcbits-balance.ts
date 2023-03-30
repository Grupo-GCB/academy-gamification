import { BadRequestException, Injectable } from '@nestjs/common';
import { Status } from '@shared/constants';
import { isUuidValid } from '@shared/utils';
import { FilterTransactionsByUserDTO } from '@transactions/dto/filter-transactions-by-user.dto';
import { ITransactionsRepository } from '@transactions/interfaces';
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

    const userFound = await this.usersRepository.findById(user);

    if (!userFound) {
      throw new BadRequestException('Usuário não encontrado!');
    }

    const transactions = await this.transactionsRepository.filterByUser({
      user,
    });

    const balance = transactions.reduce((total, transaction) => {
      if (transaction.status === Status.APPROVED) total += transaction.gcbits;
      return total;
    }, 0);

    return { balance };
  }
}
