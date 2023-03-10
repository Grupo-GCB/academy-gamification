import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateGcbitsDTO } from '@collaborator/dto';
import { Wallet } from '@collaborator/infra/entities/wallet.entity';

import { IWalletsRepository } from '@collaborator/interfaces';

@Injectable()
export class UpdateGcbits {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute({ id, gcbits }: UpdateGcbitsDTO): Promise<Wallet> {
    if (!id) throw new BadRequestException('id is required');

    const wallet: Wallet = await this.walletsRepository.findOne(id);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const updatedGcbits = (wallet.gcbits += gcbits);

    return this.walletsRepository.updateGcbits({ id, gcbits: updatedGcbits });
  }
}
