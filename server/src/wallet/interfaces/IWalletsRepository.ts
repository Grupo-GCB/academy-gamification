import { UpdateGcbitsDTO } from '@wallet/dto';
import { Wallet } from '@wallet/infra/typeorm/entities/wallet.entity';

export abstract class ITransactionsRepository {
  abstract updateStatus({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet>;
}
