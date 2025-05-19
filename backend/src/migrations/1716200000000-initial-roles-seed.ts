
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class InitialRolesSeed1716200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create roles
    await queryRunner.query(`
      INSERT INTO roles (name, description) 
      VALUES 
        ('Super Admin', 'System administrator with full access'),
        ('Company Admin', 'Company administrator with access to company-wide settings'),
        ('Manager', 'Team manager with access to team management features'),
        ('Employee', 'Regular employee user')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Get role IDs
    const superAdminRole = await queryRunner.query(`SELECT id FROM roles WHERE name = 'Super Admin' LIMIT 1`);
    const companyAdminRole = await queryRunner.query(`SELECT id FROM roles WHERE name = 'Company Admin' LIMIT 1`);
    
    // Create initial super admin user if not exists
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await queryRunner.query(`
      INSERT INTO users (email, password_hash, full_name, is_active)
      VALUES ('admin@humanityhr.com', '${hashedPassword}', 'System Administrator', TRUE)
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `);
    
    // Get the admin user ID
    const adminUser = await queryRunner.query(`SELECT id FROM users WHERE email = 'admin@humanityhr.com' LIMIT 1`);
    
    if (adminUser && adminUser.length > 0 && superAdminRole && superAdminRole.length > 0) {
      // Assign Super Admin role to admin user
      await queryRunner.query(`
        INSERT INTO user_roles (user_id, role_id)
        VALUES (${adminUser[0].id}, ${superAdminRole[0].id})
        ON CONFLICT (user_id, role_id) DO NOTHING;
      `);
    }
    
    console.log('Initial roles and admin user created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove user roles first due to foreign key constraints
    await queryRunner.query(`DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@humanityhr.com')`);
    
    // Remove the admin user
    await queryRunner.query(`DELETE FROM users WHERE email = 'admin@humanityhr.com'`);
    
    // Remove the roles
    await queryRunner.query(`DELETE FROM roles WHERE name IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')`);
  }
}
