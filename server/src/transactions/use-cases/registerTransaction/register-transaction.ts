import { SendGridService } from '@anchan828/nest-sendgrid';
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
import { IUsersRepository } from '@users/interfaces';

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
    private readonly sendGrid: SendGridService,
  ) {}

  async execute(data: RegisterTransactionDTO): Promise<Transaction> {
    const [responsible, user] = await Promise.all([
      this.usersRepository.findById(data.responsible),
      this.usersRepository.findById(data.user),
    ]);

    if (!responsible || !user)
      throw new BadRequestException('Usuário ou Responsável Não Existe!');

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
      [Roles.COLLABORATOR, Roles.ACADEMY].includes(responsible.role) &&
      user.role === Roles.ADMIN
    ) {
      throw new UnauthorizedException(
        'Collaborador ou Academy Não Podem Definir um Administrados Como Usuário!',
      );
    }

    if (
      data.type !== Types.REDEEM &&
      data.type !== Types.COLLABORATION &&
      data.sub_type !== undefined
    ) {
      throw new BadRequestException(
        `Subtipo Não Deve Ser Definido Para Transações do Tipo ${data.type}!`,
      );
    }

    if (
      [Types.REDEEM, Types.COLLABORATION].includes(data.type) &&
      !data.sub_type
    ) {
      throw new BadRequestException(
        `Subtipo é Exigido Para Transações do Tipo ${data.type}!`,
      );
    }

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
        `Subtipo Inválido Para o Tipo ${data.type} de Transação!`,
      );
    }

    if (
      data.type === Types.COLLABORATION &&
      responsible.role === Roles.ACADEMY &&
      user.role === Roles.ACADEMY
    ) {
      throw new UnauthorizedException(
        'Você Não Pode Passar a Si Mesmo ou Outro Academy Como o Usuário Para Uma Transação de Colaboração!',
      );
    }

    if (
      data.type !== Types.TRANSFER &&
      responsible.role === Roles.COLLABORATOR &&
      user.role === Roles.COLLABORATOR &&
      user.id !== responsible.id
    ) {
      throw new UnauthorizedException(
        'Colaboradores Não Podem Definir Outros Colaboradores Como Usuários!',
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
        'Você Não Pode Registrar Uma Transação Com Esse Valor!',
      );
    }

    this.checkGCBitsValue(data.gcbits);

    if (data.type === Types.REDEEM) {
      data.gcbits = -Math.abs(data.gcbits);
    } else if (data.type === Types.COLLABORATION) {
      data.gcbits = Math.abs(data.gcbits);
    }

    if (responsible.role === Roles.ADMIN) {
      await this.sendGrid.send({
        to: user.email,
        from: process.env.FROM_EMAIL,
        subject: 'Registro de Transação',
        html: `
          <div
            style="
              background-color: #ffffff;
              padding: 20px;
              font-family: Arial, sans-serif;
            "
          >
            <img
              src="https://gcbinvestimentos.com/_next/image?url=%2Fassets%2Fillustrations%2Flogo_gcb_color.svg&w=256&q=75"
              alt="Logo"
              style="display: block; margin: auto; width: 200px"
            />  
            <br />
            <h3 style="text-align: center">Registro de Transação</h3>
            <p>Olá <strong>${
              user.name
            }</strong>, uma transação na qual você está envolvido foi registrada!</p>
  
            <div>
              <h4>Dados da transação</h4>
              <p>Tipo da Transação: ${data.type}</p>
              <p>Subtipo: ${data.sub_type}</p>
              <p>GCBits: ${data.gcbits}</p>
              <p>Description: ${
                data.description === undefined
                  ? 'Esta transação não possui descrição'
                  : data.description
              }</p>
            </div>
  
            <p>
              Caso tenha alguma dúvida ou problema, não hesite em entrar em contato com o
              nosso suporte no email: kayke.fujinaka@gcbinvestimentos.com
            </p>
            <div style="text-align: center; margin-top: 30px; background: #ff6f61; padding: 10px 20px; cursor: pointer;" >
              <a style="text-decoration: none; color: #ffffff" href="https://gcbinvestimentos.com/">
                  Acessar AcadeMe
              </a>
            </div>
          </div>  
        `,
      });
    }

    return this.transactionsRepository.register(data);
  }

  private checkPermission({
    role,
    type,
    permissionMap,
    message = 'Você Não Tem Permissão!',
  }: CheckPermissionProps): void {
    const permissions = permissionMap[role] ?? [];
    const isAdmin = role === Roles.ADMIN;
    const hasPermission = isAdmin || permissions.includes(type);

    if (!hasPermission) {
      throw new UnauthorizedException(message);
    }
  }

  private checkGCBitsValue(gcbits: number): void {
    if (gcbits === 0)
      throw new BadRequestException(
        'Você Não Pode Passar GCBits Com o Valor Zero!',
      );
  }
}
