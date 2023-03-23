import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import {
  CollaborationsSubType,
  RedeemSubType,
  Roles,
  Status,
  Types,
} from '@shared/constants';
import { RegisterTransactionDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class RegisterTransaction {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: RegisterTransactionDTO): Promise<Transaction> {
    const responsible = await this.usersRepository.findById(data.responsible);
    const user = await this.usersRepository.findById(data.user);

    if (!responsible || !user)
      throw new BadRequestException('User or responsible does not exist');

    const typesPermissions = {
      [Roles.COLLABORATOR]: [Types.REDEEM, Types.TRANSFER],
      [Roles.ACADEMY]: [Types.COLLABORATION],
    };

    const isAdmin = responsible.role === Roles.ADMIN;

    const hasTypePermission =
      (isAdmin || typesPermissions[responsible.role]?.includes(data.type)) ??
      false;

    if (!hasTypePermission) {
      throw new UnauthorizedException('You do not have permission');
    }

    if (data.type !== Types.REDEEM && data.type !== Types.COLLABORATION) {
      if (data.sub_type !== undefined) {
        throw new BadRequestException(
          `Subtype should not be defined for ${data.type} transactions`,
        );
      }
    } else if (!data.sub_type) {
      throw new BadRequestException(
        `Subtype is required for ${data.type} transactions`,
      );
    } else {
      const isValidSubtype =
        (data.type === Types.REDEEM && data.sub_type in RedeemSubType) ||
        (data.type === Types.COLLABORATION &&
          data.sub_type in CollaborationsSubType);

      if (!isValidSubtype) {
        throw new BadRequestException(
          `Invalid subtype for type ${data.type} transaction.`,
        );
      }
    }

    if (
      data.type === Types.COLLABORATION &&
      responsible.role === Roles.ACADEMY &&
      user.role === Roles.ACADEMY
    ) {
      throw new UnauthorizedException(
        'You cannot pass yourself or another Academy as the user for a collaboration transaction.',
      );
    }

    if (
      data.type !== Types.TRANSFER &&
      responsible.role === Roles.COLLABORATOR &&
      user.role === Roles.COLLABORATOR &&
      user.id !== responsible.id
    ) {
      throw new UnauthorizedException(
        'Collaborators cannot define the user for another collaborator',
      );
    }

    const statusPermissions = {
      [Roles.COLLABORATOR]: [Status.PENDING],
      [Roles.ACADEMY]: [Status.PENDING],
      [Roles.ADMIN]: [Status.APPROVED],
    };

    const hasStatusPermission =
      statusPermissions[responsible.role]?.includes(data.status) ?? false;

    if (!hasStatusPermission) {
      throw new UnauthorizedException(
        'You can not register a transaction with this status',
      );
    }

    if (data.gcbits === 0)
      throw new BadRequestException('You can not pass GCBits with value zero');

    data.type == Types.COLLABORATION || data.type == Types.TRANSFER
      ? (data.gcbits = data.gcbits)
      : (data.gcbits = -data.gcbits);
    return this.transactionsRepository.register(data);
  }
}
