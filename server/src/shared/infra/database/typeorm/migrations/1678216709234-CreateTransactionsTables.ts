import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactionsTables1678216709234
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE public.TransactionReasons AS ENUM ('COLLABORATION','REDEEM','PENALTY')`,
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
            name: 'collaborator_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'business_unit',
            type: 'BusinessUnits',
            isNullable: false,
          },
          {
            name: 'reason',
            type: 'TransactionReasons',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'academys',
            type: 'varchar[]',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'CollaborationStatus',
            isNullable: false,
          },
          {
            name: 'gcbits',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'string',
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
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
    await queryRunner.query(`DROP TYPE IF EXISTS TransactionReasons`);
  }
}
