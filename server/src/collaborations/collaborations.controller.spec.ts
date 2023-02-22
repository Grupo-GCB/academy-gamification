import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationsController } from './collaborations.controller';
import { CollaborationsService } from './use-cases/collaborations.service';

describe('CollaborationsController', () => {
  let controller: CollaborationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaborationsController],
      providers: [CollaborationsService],
    }).compile();

    controller = module.get<CollaborationsController>(CollaborationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
