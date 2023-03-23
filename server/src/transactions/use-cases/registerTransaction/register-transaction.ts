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

type PermissionMap = Record<string, string[]>;

interface CheckPermissionProps {
  role: Roles;
  type: Types;
  permissionMap: PermissionMap;
  message?: string;
}

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

    const transactionPermissions: PermissionMap = {
      [Roles.COLLABORATOR]: [Types.REDEEM, Types.TRANSFER],
      [Roles.ACADEMY]: [Types.COLLABORATION],
    };

    this.checkPermission({
      role: responsible.role,
      type: data.type,
      permissionMap: transactionPermissions,
    });

    if (
      (responsible.role === Roles.COLLABORATOR ||
        responsible.role === Roles.ACADEMY) &&
      user.role === Roles.ADMIN
    ) {
      throw new UnauthorizedException(
        'Collaborators or Academies cannot define an ADMIN as the user for a transaction',
      );
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
        (data.type === Types.REDEEM &&
          Object.values(RedeemSubType).includes(
            data.sub_type as RedeemSubType,
          )) ||
        (data.type === Types.COLLABORATION &&
          Object.values(CollaborationsSubType).includes(
            data.sub_type as CollaborationsSubType,
          ));

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

    if (data.type === Types.REDEEM) {
      data.gcbits = -Math.abs(data.gcbits);
    } else if (data.type === Types.COLLABORATION) {
      data.gcbits = Math.abs(data.gcbits);
    }

    return this.transactionsRepository.register(data);
  }

  private checkPermission({
    role,
    type,
    permissionMap,
    message = 'You do not have permission',
  }: CheckPermissionProps): void {
    const permissions = permissionMap[role] ?? [];
    const isAdmin = role === Roles.ADMIN;

    if (!isAdmin && !permissions.includes(type))
      throw new UnauthorizedException(message);
  }
}
