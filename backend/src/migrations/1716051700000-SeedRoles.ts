import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1716051700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert default roles if they don't exist
    await queryRunner.query(`
      INSERT INTO roles (name, description) 
      VALUES 
        ('Super Admin', 'Has full access to all features and settings')
      ON CONFLICT (name) DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO roles (name, description) 
      VALUES 
        ('Company Admin', 'Can manage company settings and users')
      ON CONFLICT (name) DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO roles (name, description) 
      VALUES 
        ('Manager', 'Can manage team members and their data')
      ON CONFLICT (name) DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO roles (name, description) 
      VALUES 
        ('Employee', 'Regular user with limited access')
      ON CONFLICT (name) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No need to delete data in down migration for seed data
  }
}
