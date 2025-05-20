import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { seedDatabase } from './database/seeds/initial-seed';

// Load environment variables
config({ path: join(__dirname, '../.env') });

async function bootstrap() {
  const configService = new ConfigService();
  
  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', 'postgres'),
    database: configService.get('DB_DATABASE', 'loveable'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
  });

  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
    
    // Run the seed function
    await seedDatabase(dataSource);
    
    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error during Data Source initialization or seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

bootstrap();
