import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlManagementController } from './shortened-url-management.controller';

describe('ShortenedUrlManagementController', () => {
  let controller: ShortenedUrlManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenedUrlManagementController],
    }).compile();

    controller = module.get<ShortenedUrlManagementController>(ShortenedUrlManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
