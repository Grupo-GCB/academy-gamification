import {
  Academys,
  Admin,
  CollaborationsTypes,
  ReedemTypes,
} from '@shared/constants';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactionsTable1678833178779
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE public.CollaborationsTypes AS ENUM ('LOGIC_EXERCISE','CODE_REVIEW','COMMITTEE', 'DOUBTS', 'PAIR_PROGRAMMING', 'FEEDBACK', 'TEAM_CERIMONY')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.Status AS ENUM ('PENDING', 'APPROVED', 'REJECTED')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.ReedemTypes AS ENUM ('PEER_CREDIT', 'SIMPLE_PROJECT', 'MEDIUM_PROJECT', 'COMPLEX_PROJECT', 'ACADEMY')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.BusinessUnits AS ENUM ('ADIANTE', 'PEERBR', 'FMI', 'GRUPOGCB')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.Reasons AS ENUM ('COLLABORATION', 'REEDEM', 'PENALTY')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.Academys AS ENUM ('gustavo.wuelta@gcbinvestimentos.com', 'vitor.freitas@gcbinvestimentos.com', 'rafael.costa@gcbinvestimentos.com', 'leonardo.costa@gcbinvestimentos.com')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.Admin AS ENUM ('kayke.fujinaka@gcbinvestimentos.com')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.Responsibles AS ENUM ('kayke.fujinaka@gcbinvestimentos.com', 'gustavo.wuelta@gcbinvestimentos.com', 'vitor.freitas@gcbinvestimentos.com', 'rafael.costa@gcbinvestimentos.com', 'leonardo.costa@gcbinvestimentos.com')`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'collaborator',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'responsible',
            type: 'enum',
            enum: [...Object.values(Academys), ...Object.values(Admin)],
            isNullable: false,
          },
          {
            name: 'business_unit',
            type: 'BusinessUnits',
            isNullable: false,
          },
          {
            name: 'reason',
            type: 'public.Reasons',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: [
              ...Object.values(CollaborationsTypes),
              ...Object.values(ReedemTypes),
            ],
            isNullable: false,
          },
          {
            name: 'status',
            type: 'Status',
            isNullable: false,
          },
          {
            name: 'gcbits',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
    await queryRunner.query(`DROP TYPE IF EXISTS CollaborationsTypes`);
    await queryRunner.query(`DROP TYPE IF EXISTS Status`);
    await queryRunner.query(`DROP TYPE IF EXISTS ReedemTypes`);
    await queryRunner.query(`DROP TYPE IF EXISTS BusinessUnits`);
    await queryRunner.query(`DROP TYPE IF EXISTS Academys`);
    await queryRunner.query(`DROP TYPE IF EXISTS Admin`);
    await queryRunner.query(`DROP TYPE IF EXISTS Responsibles`);
    await queryRunner.query(`DROP TYPE IF EXISTS Reasons`);
  }
}
