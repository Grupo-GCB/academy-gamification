import { Test, TestingModule } from '@nestjs/testing';
import { AcademysService } from './academys.service';

describe('AcademysService', () => {
  let service: AcademysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademysService],
    }).compile();

    service = module.get<AcademysService>(AcademysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
