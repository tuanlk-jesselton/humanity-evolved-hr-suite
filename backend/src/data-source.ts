import { DataSource } from 'typeorm';
import * as path from 'path';
import 'dotenv/config';
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASSWORD || 'Aa@123456',
    database: process.env.DB_DATABASE || 'test',
    schema: process.env.DB_SCHEMA || 'public',
    entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
    synchronize: false,
});
