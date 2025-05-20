import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from '../../entities/company.entity';
import { User } from '../../auth/entities/user.entity';
import { Role } from '../../auth/entities/role.entity';
import { UserRole } from '../../auth/entities/user-role.entity';

export async function seedDatabase(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    console.log('Starting database seeding...');

    // 1. Tạo công ty mẫu
    const companyRepository = queryRunner.manager.getRepository(Company);
    let company = await companyRepository.findOne({ where: { name: 'Công ty Mẫu' } });
    
    if (!company) {
      company = companyRepository.create({
        name: 'Công ty Mẫu',
        email: 'info@congty.com',
        phone: '0123456789',
        address: {  // Convert to object since it's a JSON field
          street: '123 Đường Mẫu',
          district: 'Quận 1',
          city: 'Hồ Chí Minh'
        },
        country: 'Việt Nam',
        tax_id: '1234567890',
        // Remove is_active as it's not defined in the entity
        // If you need it, you'll need to add it to the Company entity first
      });
      await companyRepository.save(company);
      console.log('Created sample company:', company);
    }

    // 2. Tạo các vai trò (roles)
    const roleRepository = queryRunner.manager.getRepository(Role);
    const roles = [
      { name: 'SuperAdmin', description: 'Quản trị hệ thống' },
      { name: 'Admin', description: 'Quản trị công ty' },
      { name: 'HR', description: 'Nhân sự' },
      { name: 'Manager', description: 'Quản lý' },
      { name: 'Employee', description: 'Nhân viên' },
    ];

    const createdRoles = [];
    for (const roleData of roles) {
      let role = await roleRepository.findOne({ where: { name: roleData.name } });
      if (!role) {
        role = roleRepository.create(roleData);
        await roleRepository.save(role);
        console.log(`Created role: ${role.name}`);
      }
      createdRoles[roleData.name] = role;
    }

    // 3. Tạo tài khoản Super Admin
    const userRepository = queryRunner.manager.getRepository(User);
    const userRoleRepository = queryRunner.manager.getRepository(UserRole);
    
    const superAdminEmail = 'superadmin@example.com';
    let superAdmin = await userRepository.findOne({ where: { email: superAdminEmail } });
    
    if (!superAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      
      superAdmin = userRepository.create({
        email: superAdminEmail,
        passwordHash: hashedPassword,
        fullName: 'Super Admin',
        isActive: true,
      } as User);
      
      await userRepository.save(superAdmin);
      console.log('Created Super Admin user:', superAdmin.email);
      
      // Gán quyền SuperAdmin
      const superAdminRole = userRoleRepository.create({
        userId: superAdmin.id,
        roleId: createdRoles['SuperAdmin'].id,
      } as UserRole);
      await userRoleRepository.save(superAdminRole);
    }

    // 4. Tạo tài khoản nhân viên mẫu
    const employeeEmail = 'employee@example.com';
    let employee = await userRepository.findOne({ where: { email: employeeEmail } });
    
    if (!employee) {
      const hashedPassword = await bcrypt.hash('Employee@123', 10);
      
      employee = userRepository.create({
        email: employeeEmail,
        passwordHash: hashedPassword,
        fullName: 'Nhân Viên Mẫu',
        companyId: company.id,
        isActive: true,
      } as User);
      
      await userRepository.save(employee);
      console.log('Created Employee user:', employee.email);
      
      // Gán quyền Employee
      const employeeRole = userRoleRepository.create({
        userId: employee.id,
        roleId: createdRoles['Employee'].id,
      } as UserRole);
      await userRoleRepository.save(employeeRole);
    }

    await queryRunner.commitTransaction();
    console.log('Database seeding completed successfully!');
    
    // In thông tin đăng nhập để test
    console.log('\n=== Test Accounts ===');
    console.log('Super Admin:');
    console.log(`Email: ${superAdminEmail}`);
    console.log('Password: Admin@123\n');
    
    console.log('Employee:');
    console.log(`Email: ${employeeEmail}`);
    console.log('Password: Employee@123\n');

  } catch (error) {
    console.error('Error seeding database:', error);
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
