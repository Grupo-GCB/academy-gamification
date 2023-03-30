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
  TransferSubTypes,
  Types,
  CollaborationsCooldown,
} from '@shared/constants';
import {
  FilterTransactionsByUserDTO,
  RegisterTransactionDTO,
} from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces';
import { GetGCBitsBalance } from '@users/use-cases';

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
    const userData = await this.usersRepository.findByEmail(data.user);

    const responsibleData = await this.usersRepository.findByEmail(
      data.responsible,
    );

    if (data.type === Types.COLLABORATION) {
      const subType = data.sub_type as CollaborationsSubType;
      const cooldownDuration = CollaborationsCooldown[subType];

      const latestTransaction =
        await this.transactionsRepository.findLatestTransactionByUserAndSubType(
          {
            user: userData.id,
            subType,
          },
        );

      if (latestTransaction) {
        const currentTime = new Date().getTime();
        const createdAtTime = latestTransaction.created_at.getTime();
        const timeDifference = currentTime - createdAtTime;

        if (timeDifference < cooldownDuration)
          throw new BadRequestException(
            `Tem de espera para cadastrar ${subType} ainda não terminou`,
          );
      }
    }
    const [responsible, user] = await Promise.all([
      this.usersRepository.findById(responsibleData.id),
      this.usersRepository.findById(userData.id),
    ]);

    if (!responsible || !user)
      throw new BadRequestException('Usuário ou responsável não existe!');

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
        'Colaborador ou academy não podem definir um administrador como usuário!',
      );
    }

    if (
      data.type !== Types.REDEEM &&
      data.type !== Types.COLLABORATION &&
      data.type !== Types.TRANSFER &&
      data.sub_type !== undefined
    ) {
      throw new BadRequestException(
        `Subtipo não deve ser definido para transações do tipo ${data.type}!`,
      );
    }

    if (
      [Types.REDEEM, Types.COLLABORATION].includes(data.type) &&
      !data.sub_type
    ) {
      throw new BadRequestException(
        `Subtipo é exigido para transações do tipo ${data.type}!`,
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
        )) ||
      (data.type === Types.TRANSFER &&
        Object.values(TransferSubTypes).includes(
          data.sub_type as TransferSubTypes,
        ));

    if (!isValidSubtype) {
      throw new BadRequestException(
        `Subtipo inválido para o tipo ${data.type} de transação!`,
      );
    }

    if (
      data.type === Types.COLLABORATION &&
      responsible.role === Roles.ACADEMY &&
      user.role === Roles.ACADEMY
    ) {
      throw new UnauthorizedException(
        'Você não pode passar a si mesmo ou outro academy como usuário para uma transação de colaboração!',
      );
    }

    if (
      data.type !== Types.TRANSFER &&
      responsible.role === Roles.COLLABORATOR &&
      user.role === Roles.COLLABORATOR &&
      user.id !== responsible.id
    ) {
      throw new UnauthorizedException(
        'Colaboradores não podem definir outros colaboradores como usuários!',
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
        'Você não pode registrar uma transação com esse status!',
      );
    }

    this.checkGCBitsValue(data.gcbits);

    if (data.type === Types.REDEEM) {
      data.gcbits = -Math.abs(data.gcbits);
    } else if (data.type === Types.COLLABORATION) {
      data.gcbits = Math.abs(data.gcbits);
    }

    if (data.type === Types.TRANSFER) {
      const sender = await this.usersRepository.findByEmail(data.responsible);
      const receiver = await this.usersRepository.findByEmail(data.user);

      const getGCBitsBalance = new GetGCBitsBalance(
        this.transactionsRepository,
        this.usersRepository,
      );

      const sender_balance = await getGCBitsBalance.execute(
        sender.id as unknown as FilterTransactionsByUserDTO,
      );

      if (sender_balance.balance < data.gcbits) {
        throw new UnauthorizedException('Saldo insufuciente de GCBits');
      } else {
        const user_email = data.user;
        const responsible_email = data.responsible;

        data.user = receiver.id;
        data.responsible = sender.id;

        const transfer1 = this.transactionsRepository.register(data);

        await this.sendGrid.send({
          to: user_email,
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
                sender.name
              }</strong>, uma transação na qual você está envolvido foi registrada!</p>
    
              <div>
                <h4>Dados da transação</h4>
                <p>Tipo da Transação: ${data.type}</p>
                <p>Subtipo: ${data.sub_type}</p>
                <p>GCBits: ${data.gcbits}</p>
                <p>Descrição: ${
                  !data.description
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

        data.user = sender.id;
        data.responsible = receiver.id;

        data.gcbits = -data.gcbits;
        data.sub_type == TransferSubTypes.ENTRY
          ? (data.sub_type = TransferSubTypes.EXIT)
          : (data.sub_type = TransferSubTypes.ENTRY);

        this.transactionsRepository.register(data);

        await this.sendGrid.send({
          to: responsible_email,
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
                receiver.name
              }</strong>, uma transação na qual você está envolvido foi registrada!</p>
    
              <div>
                <h4>Dados da transação</h4>
                <p>Tipo da Transação: ${data.type}</p>
                <p>Subtipo: ${data.sub_type}</p>
                <p>GCBits: ${data.gcbits}</p>
                <p>Descrição: ${
                  !data.description
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

        return transfer1;
      }
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
              <p>Descrição: ${
                !data.description
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

    data.user = user.id;
    data.responsible = responsible.id;

    return this.transactionsRepository.register(data);
  }

  private checkPermission({
    role,
    type,
    permissionMap,
    message = 'Sem autorização!',
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
        'Você não pode passar GCBits com o valor zero!',
      );
  }
}
