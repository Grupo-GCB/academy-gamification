import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUsersTable1678833181853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE public.Roles AS ENUM ('COLLABORATOR','ACADEMY','ADMIN')`,
    );

    await queryRunner.query(
      `CREATE TYPE public.BusinessUnits AS ENUM ('ADIANTE','PEERBR','FMI', 'GRUPOGCB', 'ACADEMY')`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'business_unit',
            type: 'BusinessUnits',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'Roles',
            isNullable: false,
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
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'fk_transactions_user',
        columnNames: ['user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'fk_transactions_responsible',
        columnNames: ['responsible'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'fk_transactions_user');
    await queryRunner.dropForeignKey(
      'transactions',
      'fk_transactions_responsible',
    );
    await queryRunner.dropTable('users');
    await queryRunner.query(`DROP TYPE IF EXISTS Roles`);
    await queryRunner.query(`DROP TYPE IF EXISTS BusinessUnits`);
  }
}
