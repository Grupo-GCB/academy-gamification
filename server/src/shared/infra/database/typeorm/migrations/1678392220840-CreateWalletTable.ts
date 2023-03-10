import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWalletTable1678392220840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallets',
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
            name: 'gcbits',
            type: 'numeric',
            isNullable: false,
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
    await queryRunner.dropTable('wallets');
  }
}
