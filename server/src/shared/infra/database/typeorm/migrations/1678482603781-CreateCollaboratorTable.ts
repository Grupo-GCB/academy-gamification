// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class CreateCollaboratorTable1678482603781
//   implements MigrationInterface
// {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'collaborators',
//         columns: [
//           {
//             name: 'id',
//             type: 'uuid',
//             isPrimary: true,
//           },
//           {
//             name: 'name',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'email',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'password',
//             type: 'varchar',
//             isNullable: false,
//           },
//         ],
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable('collaborators');
//   }
// }
