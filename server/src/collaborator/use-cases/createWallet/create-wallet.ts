import { RegisterWalletDTO } from '@collaborator/dto';
import { Wallet } from '@collaborator/infra/entities/wallet.entity';
import { IWalletsRepository } from '@collaborator/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateWallet {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(data: RegisterWalletDTO): Promise<Wallet> {
    return this.walletsRepository.create(data);
  }
}
