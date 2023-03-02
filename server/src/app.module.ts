import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormconfig } from './ormconfig';
import { CollaborationsModule } from './collaborations/collaborations.module';

require('dotenv/config');
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CollaborationsModule],
})
export class AppModule {}
