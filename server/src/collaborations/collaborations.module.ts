import { Module } from '@nestjs/common';
import { CollaborationsController } from './collaborations.controller';
import { CollaborationsService } from './use-cases/collaborations.service';

@Module({
  controllers: [CollaborationsController],
  providers: [CollaborationsService],
})
export class CollaborationsModule {}
