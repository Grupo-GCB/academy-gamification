import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AcademysModule } from '@academys/academys.module';
import { AdminModule } from './admin/admin.module';
import { CollaborationsModule } from '@collaborations/collaborations.module';
import { CollaboratorModule } from 'collaborator/collaborator.module';
import { ormconfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AcademysModule,
    CollaborationsModule,
    CollaboratorModule,
    AdminModule,
  ],
})
export class AppModule {}
