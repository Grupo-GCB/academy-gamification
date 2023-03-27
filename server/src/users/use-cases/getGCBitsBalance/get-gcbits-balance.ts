import { BadRequestException, Injectable } from '@nestjs/common';
import { Status } from '@shared/constants';
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
    const userFound = await this.usersRepository.findById(user);

    if (!userFound) {
      throw new BadRequestException('User not found');
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
