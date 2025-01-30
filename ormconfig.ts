import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ShortenedUrlManagement } from './src/shortened-url-management/entities/shortened-url-management.entity';

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [ShortenedUrlManagement],
  synchronize: true,
};

export default config;