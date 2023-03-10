import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Wallet } from '@collaborator/infra/entities/wallet.entity';
import { UpdateGcbitsDTO } from '@collaborator/dto/update-gcbits-dto';

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

  async updateGcbits({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet> {
    await this.walletsRepository.update({ id }, { gcbits });

    return this.findOne(id);
  }
}
