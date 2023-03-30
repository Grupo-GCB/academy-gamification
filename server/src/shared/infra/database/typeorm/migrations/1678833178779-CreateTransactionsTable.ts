import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactionsTable1678833178779
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE public.TransactionSubType AS ENUM ('LOGIC_EXERCISE','CODE_REVIEW','COMMITTEE', 'DOUBTS', 'PAIR_PROGRAMMING', 'FEEDBACK', 'TEAM_CEREMONY', 'PEER_CREDIT', 'SIMPLE_PROJECT', 'MEDIUM_PROJECT', 'COMPLEX_PROJECT', 'ACADEMY', 'ENTRY', 'EXIT')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.Status AS ENUM ('PENDING', 'APPROVED', 'REJECTED')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.Types AS ENUM ('COLLABORATION', 'REDEEM', 'PENALTY', 'TRANSFER', 'CORRECTION')`,
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
            name: 'user',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'responsible',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'Types',
            isNullable: false,
          },
          {
            name: 'sub_type',
            type: 'TransactionSubType',
            isNullable: true,
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
    await queryRunner.query(`DROP TYPE IF EXISTS TransactionSubType`);
    await queryRunner.query(`DROP TYPE IF EXISTS Status`);
    await queryRunner.query(`DROP TYPE IF EXISTS Academys`);
    await queryRunner.query(`DROP TYPE IF EXISTS Admin`);
    await queryRunner.query(`DROP TYPE IF EXISTS Responsibles`);
    await queryRunner.query(`DROP TYPE IF EXISTS Types`);
  }
}
