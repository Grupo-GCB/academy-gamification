import { UpdateGcbitsDTO, RegisterWalletDTO } from '@collaborator/dto';
import { Wallet } from '@collaborator/infra/entities/wallet.entity';
import { IWalletsRepository } from '@collaborator/interfaces';

export class InMemoryWalletsRepository implements IWalletsRepository {
  wallets: Wallet[] = [];

  async create(data: RegisterWalletDTO): Promise<Wallet> {
    const wallet: Wallet = Object.assign(new Wallet(), data);

    this.wallets.push(wallet);

    return wallet;
  }

  async findOne(id: string): Promise<Wallet> {
    return this.wallets.find((wallets) => wallets.id === id);
  }

  async updateGcbits({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet> {
    const wallet: Wallet = await this.findOne(id);

    wallet.gcbits += gcbits;

    return wallet;
  }
}
