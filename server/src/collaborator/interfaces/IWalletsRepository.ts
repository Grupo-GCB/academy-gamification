import { UpdateGcbitsDTO, RegisterWalletDTO } from '@collaborator/dto';
import { Wallet } from '@collaborator/infra/entities/wallet.entity';

export abstract class IWalletsRepository {
  abstract findOne(id: string): Promise<Wallet>;
  abstract updateGcbits({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet>;
  abstract create(data: RegisterWalletDTO): Promise<Wallet>;
}
