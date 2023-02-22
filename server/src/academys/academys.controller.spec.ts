import { Test, TestingModule } from '@nestjs/testing';
import { AcademysController } from './academys.controller';
import { AcademysService } from './use-cases/academys.service';

describe('AcademysController', () => {
  let controller: AcademysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademysController],
      providers: [AcademysService],
    }).compile();

    controller = module.get<AcademysController>(AcademysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
