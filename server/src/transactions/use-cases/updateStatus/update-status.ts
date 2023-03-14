import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Roles } from '@shared/constants';

import { UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';
import { FindById } from '@users/use-cases/findById/find-by-id';

@Injectable()
export class UpdateStatus {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    newStatus,
    user_id,
  }: UpdateStatusDTO): Promise<Transaction> {
    if (!newStatus) throw new BadRequestException('newStatus is required');
    if (!id) throw new BadRequestException('id is required');

    const findById = new FindById(this.usersRepository);
    const user = findById.execute(user_id);
    if ((await user).role != Roles.ADMIN) {
      throw new Error('you must be a administrator');
    }

    const transaction: Transaction = await this.transactionsRepository.findOne(
      id,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.transactionsRepository.updateStatus({
      id,
      newStatus,
      user_id,
    });
  }
}
