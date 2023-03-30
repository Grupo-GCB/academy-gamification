import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUuidValid } from '@shared/utils';

import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';

@Injectable()
export class FindById {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(id: string): Promise<Transaction> {
    if (!isUuidValid(id)) throw new BadRequestException('Id inválido!');

    const transaction: Transaction = await this.transactionsRepository.findById(
      id,
    );

    if (!transaction) throw new NotFoundException('Transação não encontrada!');

    return transaction;
  }
}
