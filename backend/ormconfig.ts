import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import path from 'path';

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres-667463e91a05-public.rds-pg.bytepluses.com',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'hrmonster',
  password: process.env.DB_PASSWORD || '@Jesselton2025',
  database: process.env.DB_DATABASE || 'dev',
  entities: [
    path.join(__dirname, 'src/**/*.entity{.ts,.js}'),
    path.join(__dirname, 'modules/**/*.entity{.ts,.js}'),
  ],
  migrations: [
    path.join(__dirname, 'src/migrations/**/*{.ts,.js}'),
  ],
  migrationsTableName: 'migrations',
  schema: 'public',
  logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  synchronize: false,
  migrationsRun: false,
});
