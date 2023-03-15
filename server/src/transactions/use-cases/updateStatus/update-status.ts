import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from '@shared/constants';

import { UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class UpdateStatus {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    new_status,
    admin,
  }: UpdateStatusDTO): Promise<Transaction> {
    if (!new_status) throw new BadRequestException('new status is required');
    if (!id) throw new BadRequestException('ID is required');

    const responsible = this.usersRepository.findOne(admin);
    if ((await responsible).role != Roles.ADMIN) {
      throw new UnauthorizedException('you must be a administrator');
    }

    const transaction: Transaction = await this.transactionsRepository.findOne(
      id,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.transactionsRepository.updateStatus({
      id,
      new_status,
      admin,
    });
  }
}
