import { UpdateGcbitsDTO } from '@wallet/dto';
import { Wallet } from '@wallet/infra/typeorm/entities/wallet.entity';
import { IWalletsRepository } from '@wallet/interfaces';

export class InMemoryWalletsRepository implements IWalletsRepository {
  wallets: Wallet[] = [];

  async findOne(id: string): Promise<Wallet> {
    return this.wallets.find((wallets) => wallets.id === id);
  }

  async updateGcbits({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet> {
    const wallet: Wallet = await this.findOne(id);

    wallet.gcbits = gcbits;

    return wallet;
  }
}
