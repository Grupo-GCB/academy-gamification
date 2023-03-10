import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Wallet } from '@collaborator/infra/entities/wallet.entity';
import { UpdateGcbitsDTO, RegisterWalletDTO } from '@collaborator/dto';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
  ) {}
  async findOne(id: string): Promise<Wallet> {
    return this.walletsRepository.findOne({
      where: { id },
    });
  }

  async create({
    collaborator_id,
    gcbits,
  }: RegisterWalletDTO): Promise<Wallet> {
    const wallet: Wallet = this.walletsRepository.create({
      collaborator_id,
      gcbits,
    });

    return this.walletsRepository.save(wallet);
  }

  async updateGcbits({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet> {
    await this.walletsRepository.update({ id }, { gcbits });

    return this.findOne(id);
  }
}
