import { Module } from '@nestjs/common';
import { ShortenedUrlManagementController } from './shortened-url-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenedUrlManagement } from './entities/shortened-url-management.entity';
import { ShortenedUrlManagementService } from './shortened-url-management.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortenedUrlManagement])],
  controllers: [ShortenedUrlManagementController],
  providers:[ShortenedUrlManagementService]
})
export class ShortenedUrlManagementModule {}
