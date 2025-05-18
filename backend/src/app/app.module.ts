import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('TypeORM');
        
        return {
          type: 'postgres',
          host: config.get('DB_HOST', 'localhost'),
          port: +config.get('DB_PORT', 5432),
          username: config.get('DB_USERNAME', 'postgres'),
          password: config.get('DB_PASSWORD', 'postgres'),
          database: config.get('DB_DATABASE', 'test'),
          schema: config.get('DB_SCHEMA', 'public'),
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
          ],
          migrations: [
            __dirname + '/../migrations/*{.ts,.js}',
          ],
          synchronize: config.get('NODE_ENV') !== 'production',
          logging: config.get('NODE_ENV') === 'development' ? 'all' : ['error', 'warn'],
          logger: 'advanced-console',
          maxQueryExecutionTime: 1000, // Log slow queries
          connectTimeoutMS: 10000, // 10 seconds
          extra: {
            max: 20, // Max number of connections
            connectionTimeoutMillis: 2000, // 2 seconds
            idleTimeoutMillis: 30000, // 30 seconds
          },
        };
      },
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: Logger,
    },
  ],
})
export class AppModule {}