import { UpdateGcbitsDTO } from '@wallet/dto';
import { Wallet } from '@wallet/infra/typeorm/entities/wallet.entity';

export abstract class IWalletsRepository {
  abstract findOne(id: string): Promise<Wallet>;
  abstract updateGcbits({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet>;
}
