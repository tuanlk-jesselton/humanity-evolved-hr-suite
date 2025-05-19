
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHrPayrollSchema1716300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Companies table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        domain VARCHAR(255),
        logo_url TEXT,
        industry VARCHAR(100),
        size VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100),
        phone VARCHAR(50),
        email VARCHAR(255),
        website VARCHAR(255),
        tax_id VARCHAR(100),
        registration_number VARCHAR(100),
        fiscal_year_start DATE,
        settings JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Update users table to reference company
    await queryRunner.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL
    `);

    // Departments table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        head_id INTEGER,
        parent_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Employees table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
        manager_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
        employee_id VARCHAR(100),
        job_title VARCHAR(255),
        date_of_birth DATE,
        gender VARCHAR(50),
        marital_status VARCHAR(50),
        phone_number VARCHAR(50),
        emergency_contact_name VARCHAR(100),
        emergency_contact_phone VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100),
        nationality VARCHAR(100),
        profile_image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Add foreign key from departments to employees for the head
    await queryRunner.query(`
      ALTER TABLE departments 
      ADD CONSTRAINT fk_department_head 
      FOREIGN KEY (head_id) REFERENCES employees(id) ON DELETE SET NULL
    `);

    // Employment details table
    await queryRunner.query(`
      CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'intern', 'temporary');
      CREATE TYPE employment_status AS ENUM ('active', 'probation', 'leave', 'terminated');
      
      CREATE TABLE IF NOT EXISTS employment_details (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        hire_date DATE NOT NULL,
        end_date DATE,
        employment_type employment_type DEFAULT 'full_time',
        status employment_status DEFAULT 'active',
        contract_file TEXT,
        notes TEXT,
        is_current BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Salaries table
    await queryRunner.query(`
      CREATE TYPE salary_type AS ENUM ('hourly', 'daily', 'monthly', 'annual');
      CREATE TYPE payment_frequency AS ENUM ('weekly', 'biweekly', 'semimonthly', 'monthly');
      
      CREATE TABLE IF NOT EXISTS salaries (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        effective_date DATE NOT NULL,
        end_date DATE,
        salary_type salary_type DEFAULT 'monthly',
        amount DECIMAL(12,2) NOT NULL,
        payment_frequency payment_frequency DEFAULT 'monthly',
        currency VARCHAR(3) DEFAULT 'USD',
        is_current BOOLEAN DEFAULT true,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Payroll cycles table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS payroll_cycles (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        frequency payment_frequency DEFAULT 'monthly',
        description TEXT,
        start_date DATE,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Payroll runs table
    await queryRunner.query(`
      CREATE TYPE payroll_run_status AS ENUM ('draft', 'processing', 'completed', 'approved', 'cancelled');
      
      CREATE TABLE IF NOT EXISTS payroll_runs (
        id SERIAL PRIMARY KEY,
        payroll_cycle_id INTEGER NOT NULL REFERENCES payroll_cycles(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        payment_date DATE NOT NULL,
        status payroll_run_status DEFAULT 'draft',
        total_gross DECIMAL(12,2) DEFAULT 0,
        total_deductions DECIMAL(12,2) DEFAULT 0,
        total_net DECIMAL(12,2) DEFAULT 0,
        notes TEXT,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        approved_at TIMESTAMP WITH TIME ZONE,
        locked BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Payslip items table
    await queryRunner.query(`
      CREATE TYPE payslip_item_type AS ENUM ('earning', 'deduction', 'tax', 'benefit');
      
      CREATE TABLE IF NOT EXISTS payslip_items (
        id SERIAL PRIMARY KEY,
        payroll_run_id INTEGER NOT NULL REFERENCES payroll_runs(id) ON DELETE CASCADE,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        type payslip_item_type DEFAULT 'earning',
        amount DECIMAL(12,2) NOT NULL,
        reference VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Leave types table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS leave_types (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        default_days DECIMAL(5,2) DEFAULT 0,
        paid BOOLEAN DEFAULT true,
        active BOOLEAN DEFAULT true,
        color VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Leave requests table
    await queryRunner.query(`
      CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
      
      CREATE TABLE IF NOT EXISTS leave_requests (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        leave_type_id INTEGER NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        days DECIMAL(5,2) NOT NULL,
        status leave_status DEFAULT 'pending',
        reason TEXT,
        comments TEXT,
        attachment TEXT,
        approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        approved_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Time entries table
    await queryRunner.query(`
      CREATE TYPE time_entry_status AS ENUM ('pending', 'approved', 'rejected');
      
      CREATE TABLE IF NOT EXISTS time_entries (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        clock_in TIMESTAMP WITH TIME ZONE,
        clock_out TIMESTAMP WITH TIME ZONE,
        hours DECIMAL(5,2),
        break_minutes INTEGER DEFAULT 0,
        overtime_minutes INTEGER DEFAULT 0,
        notes TEXT,
        status time_entry_status DEFAULT 'pending',
        approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        approved_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Benefits table
    await queryRunner.query(`
      CREATE TYPE benefit_type AS ENUM ('health', 'dental', 'vision', 'retirement', 'life_insurance', 'other');
      
      CREATE TABLE IF NOT EXISTS benefits (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        type benefit_type DEFAULT 'other',
        provider VARCHAR(100),
        policy_number VARCHAR(100),
        active BOOLEAN DEFAULT true,
        effective_date DATE,
        end_date DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Employee benefits table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS employee_benefits (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        benefit_id INTEGER NOT NULL REFERENCES benefits(id) ON DELETE CASCADE,
        enrollment_date DATE NOT NULL,
        end_date DATE,
        coverage_level VARCHAR(100),
        employee_contribution DECIMAL(12,2) DEFAULT 0,
        employer_contribution DECIMAL(12,2) DEFAULT 0,
        active BOOLEAN DEFAULT true,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Job postings table
    await queryRunner.query(`
      CREATE TYPE job_status AS ENUM ('draft', 'open', 'closed', 'on_hold');
      
      CREATE TABLE IF NOT EXISTS job_postings (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        requirements TEXT,
        location VARCHAR(255),
        status job_status DEFAULT 'draft',
        opening_date DATE,
        closing_date DATE,
        salary_range VARCHAR(100),
        employment_type VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Candidates table
    await queryRunner.query(`
      CREATE TYPE candidate_status AS ENUM ('new', 'screening', 'interview', 'offer', 'hired', 'rejected', 'withdrawn');
      
      CREATE TABLE IF NOT EXISTS candidates (
        id SERIAL PRIMARY KEY,
        job_posting_id INTEGER NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        resume_url TEXT,
        cover_letter_url TEXT,
        status candidate_status DEFAULT 'new',
        notes TEXT,
        skills TEXT[],
        source VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Interviews table
    await queryRunner.query(`
      CREATE TYPE interview_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');
      
      CREATE TABLE IF NOT EXISTS interviews (
        id SERIAL PRIMARY KEY,
        candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
        interviewer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
        duration_minutes INTEGER,
        location VARCHAR(255),
        meeting_link TEXT,
        status interview_status DEFAULT 'scheduled',
        notes TEXT,
        feedback JSONB,
        rating INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Performance reviews table
    await queryRunner.query(`
      CREATE TYPE review_status AS ENUM ('draft', 'in_progress', 'employee_submitted', 'manager_reviewing', 'completed');
      
      CREATE TABLE IF NOT EXISTS performance_reviews (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        reviewer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        template_id INTEGER,
        review_period_start DATE NOT NULL,
        review_period_end DATE NOT NULL,
        due_date DATE NOT NULL,
        status review_status DEFAULT 'draft',
        self_assessment TEXT,
        manager_assessment TEXT,
        rating DECIMAL(3,2),
        notes TEXT,
        completed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Goals table
    await queryRunner.query(`
      CREATE TYPE goal_status AS ENUM ('not_started', 'in_progress', 'completed', 'cancelled');
      CREATE TYPE goal_priority AS ENUM ('low', 'medium', 'high');
      
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        performance_review_id INTEGER REFERENCES performance_reviews(id) ON DELETE SET NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status goal_status DEFAULT 'not_started',
        priority goal_priority DEFAULT 'medium',
        due_date DATE,
        progress INTEGER DEFAULT 0,
        metrics TEXT,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Documents table
    await queryRunner.query(`
      CREATE TYPE document_type AS ENUM ('id', 'resume', 'contract', 'certificate', 'tax', 'other');
      
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        type document_type DEFAULT 'other',
        file_url TEXT NOT NULL,
        description TEXT,
        file_type VARCHAR(50),
        expiry_date DATE,
        is_verified BOOLEAN DEFAULT false,
        verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        verified_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS documents`);
    await queryRunner.query(`DROP TYPE IF EXISTS document_type`);
    await queryRunner.query(`DROP TABLE IF EXISTS goals`);
    await queryRunner.query(`DROP TYPE IF EXISTS goal_priority`);
    await queryRunner.query(`DROP TYPE IF EXISTS goal_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS performance_reviews`);
    await queryRunner.query(`DROP TYPE IF EXISTS review_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS interviews`);
    await queryRunner.query(`DROP TYPE IF EXISTS interview_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS candidates`);
    await queryRunner.query(`DROP TYPE IF EXISTS candidate_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS job_postings`);
    await queryRunner.query(`DROP TYPE IF EXISTS job_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS employee_benefits`);
    await queryRunner.query(`DROP TABLE IF EXISTS benefits`);
    await queryRunner.query(`DROP TYPE IF EXISTS benefit_type`);
    await queryRunner.query(`DROP TABLE IF EXISTS time_entries`);
    await queryRunner.query(`DROP TYPE IF EXISTS time_entry_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS leave_requests`);
    await queryRunner.query(`DROP TYPE IF EXISTS leave_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS leave_types`);
    await queryRunner.query(`DROP TABLE IF EXISTS payslip_items`);
    await queryRunner.query(`DROP TYPE IF EXISTS payslip_item_type`);
    await queryRunner.query(`DROP TABLE IF EXISTS payroll_runs`);
    await queryRunner.query(`DROP TYPE IF EXISTS payroll_run_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS payroll_cycles`);
    await queryRunner.query(`DROP TABLE IF EXISTS salaries`);
    await queryRunner.query(`DROP TYPE IF EXISTS payment_frequency`);
    await queryRunner.query(`DROP TYPE IF EXISTS salary_type`);
    await queryRunner.query(`DROP TABLE IF EXISTS employment_details`);
    await queryRunner.query(`DROP TYPE IF EXISTS employment_status`);
    await queryRunner.query(`DROP TYPE IF EXISTS employment_type`);
    await queryRunner.query(`ALTER TABLE departments DROP CONSTRAINT IF EXISTS fk_department_head`);
    await queryRunner.query(`DROP TABLE IF EXISTS employees`);
    await queryRunner.query(`DROP TABLE IF EXISTS departments`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN IF EXISTS company_id`);
    await queryRunner.query(`DROP TABLE IF EXISTS companies`);
  }
}
