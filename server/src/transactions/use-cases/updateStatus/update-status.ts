import { SendGridService } from '@anchan828/nest-sendgrid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles, Status } from '@shared/constants';

import { UpdateStatusDTO } from '@transactions/dto';
import { Transaction } from '@transactions/infra/typeorm/entities/transaction.entity';
import { ITransactionsRepository } from '@transactions/interfaces';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class UpdateStatus {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private usersRepository: IUsersRepository,
    private readonly sendGrid: SendGridService,
  ) {}

  async execute({
    id,
    new_status,
    admin,
  }: UpdateStatusDTO): Promise<Transaction> {
    if (!new_status) throw new BadRequestException('Novo status é exigido!');
    if (!id) throw new BadRequestException('Id é exigido!');

    const responsible = await this.usersRepository.findByEmail(admin);

    if (!responsible)
      throw new BadRequestException('Administrador não encontrado!');

    if (responsible.role != Roles.ADMIN) {
      throw new UnauthorizedException('Sem autorização!');
    }

    const transaction: Transaction = await this.transactionsRepository.findById(
      id,
    );

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada!');
    }

    if (transaction.status === new_status) {
      throw new NotFoundException('A Transação já tem esse status!');
    }

    const user = await this.usersRepository.findById(transaction.user);

    if (new_status === Status.APPROVED) {
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
              <p>Tipo da Transação: ${transaction.type}</p>
              <p>Subtipo: ${transaction.sub_type}</p>
              <p>GCBits: ${transaction.gcbits}</p>
              <p>Description: ${
                transaction.description === undefined
                  ? 'Esta transação não possui descrição'
                  : transaction.description
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

    return this.transactionsRepository.updateStatus({
      id,
      new_status,
      admin,
    });
  }
}
