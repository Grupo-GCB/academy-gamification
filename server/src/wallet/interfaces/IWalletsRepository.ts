import { UpdateGcbitsDTO } from '@wallet/dto';
import { Wallet } from '@wallet/infra/typeorm/entities/wallet.entity';

export abstract class IWalletsRepository {
  abstract updateGcbits({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet>;
}
