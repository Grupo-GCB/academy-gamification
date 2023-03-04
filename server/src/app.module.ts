import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule } from '@nestjs/axios';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { ormconfig } from './ormconfig';

require('dotenv/config');
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CollaborationsModule, HttpModule],
})
export class AppModule {}
