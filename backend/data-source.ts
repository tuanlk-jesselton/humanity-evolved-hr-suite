import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Load environment variables
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'postgres'),
  database: configService.get('DB_DATABASE', 'test'),
  schema: configService.get('DB_SCHEMA', 'public'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  synchronize: false, // Important: set to false when using migrations
  logging: true,
});
