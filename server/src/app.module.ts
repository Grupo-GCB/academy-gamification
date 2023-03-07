import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollaborationsModule } from './collaborations/collaborations.module';
import { ormconfig } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CollaborationsModule],
})
export class AppModule {}
