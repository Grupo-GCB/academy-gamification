import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCollaborationsTables1677878578321
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE CollaborationStatus AS ENUM (
              'APPROVED',
              'PENDING',
              'REJECTED'
            )`);
    await queryRunner.query(`
            CREATE TYPE CollaborationTypes AS ENUM (
              'CODE REVIEW',
              'LOGIC EXERCISE'
            )`);
    await queryRunner.query(`
            CREATE TYPE BusinessUnits AS ENUM (
              'ADIANTE',
              'PEERBR',
              'FMI',
              'GRUPOGCB'
            )`);

    await queryRunner.createTable(
      new Table({
        name: 'collaborations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'CollaborationTypes',
            isPrimary: false,
          },
          {
            name: 'url',
            type: 'varchar',
            isPrimary: false,
          },
          {
            name: 'collaborator_id',
            type: 'uuid',
            isPrimary: false,
          },
          {
            name: 'businessUnit',
            type: 'BusinessUnits',
            isPrimary: false,
          },
          {
            name: 'status',
            type: 'CollaborationStatus',
            isPrimary: false,
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
            default: null,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
    await queryRunner.query(
      `ALTER TABLE collaborations ADD COLUMN CollaborationTypes CollaborationTypes`,
    );

    await queryRunner.query(
      `ALTER TABLE collaborations ADD COLUMN CollaborationStatus CollaborationStatus`,
    );
    await queryRunner.query(
      `ALTER TABLE collaborations ADD COLUMN BusinessUnits BusinessUnits`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('collaborations');
    await queryRunner.query(`DROP TYPE IF EXISTS CollaborationTypes`);
    await queryRunner.query(`DROP TYPE IF EXISTS CollaborationStatus`);
    await queryRunner.query(`DROP TYPE IF EXISTS BusinessUnits`);
  }
}
