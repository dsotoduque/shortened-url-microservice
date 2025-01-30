import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenedUrlManagement } from './shortened-url-management/entities/shortened-url-management.entity';
import { ShortenedUrlManagementModule } from './shortened-url-management/shortened-url-management.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "shortned.sqlite",
      entities: [ShortenedUrlManagement],
      synchronize: true,
    }),
    ShortenedUrlManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
