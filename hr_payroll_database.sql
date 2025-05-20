-- HR Payroll System Database Schema
-- Comprehensive SQL file for creating the complete database structure

-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS performance_reviews;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS job_postings;
DROP TABLE IF EXISTS shifts;
DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS leave_types;
DROP TABLE IF EXISTS time_entries;
DROP TABLE IF EXISTS employee_benefits;
DROP TABLE IF EXISTS benefits;
DROP TABLE IF EXISTS payslip_items;
DROP TABLE IF EXISTS payroll_runs;
DROP TABLE IF EXISTS payroll_cycles;
DROP TABLE IF EXISTS deductions;
DROP TABLE IF EXISTS salaries;
DROP TABLE IF EXISTS employment_details;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS user_permissions;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

-- Create Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Create Roles table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    is_system_role BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create User Roles junction table
CREATE TABLE user_roles (
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create Permissions table
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (resource, action)
);

-- Create Role Permissions junction table
CREATE TABLE user_permissions (
    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255) NOT NULL,
    tax_id VARCHAR(50),
    registration_number VARCHAR(50),
    industry VARCHAR(100),
    company_size VARCHAR(50),
    founded_date DATE,
    fiscal_year_start DATE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    logo_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Create Departments table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20),
    description TEXT,
    parent_department_id UUID,
    manager_id UUID,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Create Employees table
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    company_id UUID NOT NULL,
    department_id UUID,
    employee_id VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    preferred_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(20),
    marital_status VARCHAR(20),
    nationality VARCHAR(100),
    tax_id VARCHAR(50),
    social_security_number VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    personal_email VARCHAR(255),
    work_email VARCHAR(255) NOT NULL,
    personal_phone VARCHAR(20),
    work_phone VARCHAR(20),
    emergency_contact_name VARCHAR(200),
    emergency_contact_relationship VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    profile_picture_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    UNIQUE (company_id, employee_id),
    UNIQUE (work_email)
);

-- Add manager foreign key to departments after employees table is created
ALTER TABLE departments ADD CONSTRAINT fk_department_manager
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL;

-- Create Employment Details table
CREATE TABLE employment_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    employment_type VARCHAR(50) NOT NULL, -- Full-time, Part-time, Contract, etc.
    employment_status VARCHAR(50) NOT NULL, -- Active, On Leave, Terminated, etc.
    job_title VARCHAR(100) NOT NULL,
    job_description TEXT,
    hire_date DATE NOT NULL,
    probation_end_date DATE,
    regular_employment_date DATE,
    termination_date DATE,
    termination_reason TEXT,
    termination_type VARCHAR(50), -- Voluntary, Involuntary, etc.
    notice_period_days INTEGER,
    reporting_manager_id UUID,
    work_location VARCHAR(100),
    work_schedule VARCHAR(100),
    weekly_working_hours DECIMAL(5,2),
    is_remote BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (reporting_manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- Create Salaries table
CREATE TABLE salaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    salary_type VARCHAR(50) NOT NULL, -- Hourly, Monthly, Annual, etc.
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    effective_date DATE NOT NULL,
    end_date DATE,
    payment_frequency VARCHAR(50) NOT NULL, -- Weekly, Bi-weekly, Monthly, etc.
    bank_name VARCHAR(100),
    bank_account_number VARCHAR(50),
    bank_routing_number VARCHAR(50),
    payment_method VARCHAR(50), -- Direct Deposit, Check, etc.
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Create Deductions table
CREATE TABLE deductions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    deduction_type VARCHAR(50) NOT NULL, -- Pre-tax, Post-tax, etc.
    calculation_type VARCHAR(50) NOT NULL, -- Percentage, Fixed Amount, etc.
    calculation_value DECIMAL(15,2) NOT NULL,
    is_taxable BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Create Payroll Cycles table
CREATE TABLE payroll_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    frequency VARCHAR(50) NOT NULL, -- Weekly, Bi-weekly, Monthly, etc.
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Create Payroll Runs table
CREATE TABLE payroll_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    payroll_cycle_id UUID NOT NULL,
    run_date TIMESTAMP NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL, -- Draft, Processing, Completed, etc.
    total_gross_pay DECIMAL(15,2),
    total_net_pay DECIMAL(15,2),
    total_deductions DECIMAL(15,2),
    total_taxes DECIMAL(15,2),
    notes TEXT,
    processed_by UUID,
    approved_by UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (payroll_cycle_id) REFERENCES payroll_cycles(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Payslip Items table
CREATE TABLE payslip_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payroll_run_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    gross_pay DECIMAL(15,2) NOT NULL,
    net_pay DECIMAL(15,2) NOT NULL,
    regular_hours DECIMAL(10,2),
    overtime_hours DECIMAL(10,2),
    regular_pay DECIMAL(15,2),
    overtime_pay DECIMAL(15,2),
    bonus DECIMAL(15,2),
    commission DECIMAL(15,2),
    federal_tax DECIMAL(15,2),
    state_tax DECIMAL(15,2),
    local_tax DECIMAL(15,2),
    social_security_tax DECIMAL(15,2),
    medicare_tax DECIMAL(15,2),
    retirement_deduction DECIMAL(15,2),
    health_insurance_deduction DECIMAL(15,2),
    other_deductions DECIMAL(15,2),
    reimbursements DECIMAL(15,2),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payroll_run_id) REFERENCES payroll_runs(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Create Benefits table
CREATE TABLE benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    benefit_type VARCHAR(50) NOT NULL, -- Health Insurance, Retirement, etc.
    provider VARCHAR(100),
    policy_number VARCHAR(100),
    coverage_details TEXT,
    cost_to_company DECIMAL(15,2),
    cost_to_employee DECIMAL(15,2),
    calculation_type VARCHAR(50), -- Percentage, Fixed Amount, etc.
    calculation_value DECIMAL(15,2),
    effective_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Create Employee Benefits junction table
CREATE TABLE employee_benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    benefit_id UUID NOT NULL,
    enrollment_date DATE NOT NULL,
    end_date DATE,
    coverage_level VARCHAR(50), -- Employee Only, Employee+Spouse, Family, etc.
    employee_contribution DECIMAL(15,2),
    employer_contribution DECIMAL(15,2),
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (benefit_id) REFERENCES benefits(id) ON DELETE CASCADE
);

-- Create Time Entries table
CREATE TABLE time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    entry_date DATE NOT NULL,
    clock_in TIMESTAMP NOT NULL,
    clock_out TIMESTAMP,
    break_start TIMESTAMP,
    break_end TIMESTAMP,
    total_hours DECIMAL(10,2),
    regular_hours DECIMAL(10,2),
    overtime_hours DECIMAL(10,2),
    status VARCHAR(50) NOT NULL, -- Pending, Approved, Rejected, etc.
    notes TEXT,
    approved_by UUID,
    approved_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Leave Types table
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Hex color code for UI
    is_paid BOOLEAN DEFAULT TRUE,
    accrual_rate DECIMAL(10,2), -- Hours or days accrued per period
    accrual_period VARCHAR(50), -- Monthly, Quarterly, Yearly, etc.
    max_accrual DECIMAL(10,2), -- Maximum hours or days that can be accrued
    carryover_limit DECIMAL(10,2), -- Maximum hours or days that can be carried over
    min_service_days INTEGER, -- Minimum service days required to be eligible
    requires_approval BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Create Leave Requests table
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    leave_type_id UUID NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_half_day VARCHAR(10), -- None, First Half, Second Half
    end_half_day VARCHAR(10), -- None, First Half, Second Half
    total_days DECIMAL(10,2) NOT NULL,
    reason TEXT,
    status VARCHAR(50) NOT NULL, -- Pending, Approved, Rejected, Cancelled
    approved_by UUID,
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    attachment_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (leave_type_id) REFERENCES leave_types(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Shifts table
CREATE TABLE shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_duration INTEGER, -- In minutes
    is_overnight BOOLEAN DEFAULT FALSE,
    days_of_week VARCHAR(20), -- Comma-separated days (1-7, where 1 is Monday)
    color VARCHAR(7), -- Hex color code for UI
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Create Job Postings table
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    department_id UUID,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    employment_type VARCHAR(50), -- Full-time, Part-time, Contract, etc.
    location VARCHAR(100),
    is_remote BOOLEAN DEFAULT FALSE,
    salary_min DECIMAL(15,2),
    salary_max DECIMAL(15,2),
    salary_currency VARCHAR(3) DEFAULT 'USD',
    benefits_summary TEXT,
    application_deadline DATE,
    posting_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL, -- Draft, Published, Closed, etc.
    external_posting_urls TEXT, -- JSON array of external job board URLs
    created_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Candidates table
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_posting_id UUID,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    resume_url VARCHAR(255),
    cover_letter_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    source VARCHAR(100), -- Where the candidate came from
    status VARCHAR(50) NOT NULL, -- New, Screening, Interview, Offer, Hired, Rejected, etc.
    current_salary DECIMAL(15,2),
    expected_salary DECIMAL(15,2),
    salary_currency VARCHAR(3) DEFAULT 'USD',
    notice_period VARCHAR(50),
    availability_date DATE,
    notes TEXT,
    rating INTEGER, -- 1-5 rating
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_posting_id) REFERENCES job_postings(id) ON DELETE SET NULL
);

-- Create Interviews table
CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID NOT NULL,
    interview_type VARCHAR(50) NOT NULL, -- Phone, Video, In-person, etc.
    scheduled_date TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL, -- In minutes
    location VARCHAR(255),
    meeting_link VARCHAR(255),
    status VARCHAR(50) NOT NULL, -- Scheduled, Completed, Cancelled, etc.
    feedback TEXT,
    rating INTEGER, -- 1-5 rating
    interviewer_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    FOREIGN KEY (interviewer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Performance Reviews table
CREATE TABLE performance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    reviewer_id UUID NOT NULL,
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    review_date DATE NOT NULL,
    review_type VARCHAR(50) NOT NULL, -- Annual, Quarterly, Probation, etc.
    status VARCHAR(50) NOT NULL, -- Draft, In Progress, Completed, etc.
    overall_rating DECIMAL(3,2), -- 1-5 rating with decimals
    strengths TEXT,
    areas_for_improvement TEXT,
    goals_achievement TEXT,
    comments TEXT,
    employee_acknowledgment BOOLEAN DEFAULT FALSE,
    employee_comments TEXT,
    next_review_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Goals table
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    performance_review_id UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    goal_type VARCHAR(50), -- Performance, Development, etc.
    start_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL, -- Not Started, In Progress, Completed, etc.
    progress INTEGER DEFAULT 0, -- 0-100 percentage
    priority VARCHAR(20), -- Low, Medium, High
    measurement_criteria TEXT,
    created_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (performance_review_id) REFERENCES performance_reviews(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL,
    employee_id UUID,
    document_type VARCHAR(100) NOT NULL, -- Contract, ID, Certificate, etc.
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_url VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    expiry_date DATE,
    is_confidential BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) NOT NULL, -- Active, Archived, Expired, etc.
    uploaded_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL, -- System, Payroll, Leave, etc.
    related_resource_type VARCHAR(50), -- Employee, Payroll, Leave, etc.
    related_resource_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Audit Logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action VARCHAR(50) NOT NULL, -- Create, Update, Delete, Login, etc.
    resource_type VARCHAR(50) NOT NULL, -- User, Employee, Payroll, etc.
    resource_id UUID,
    description TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_employees_company_id ON employees(company_id);
CREATE INDEX idx_employees_department_id ON employees(department_id);
CREATE INDEX idx_departments_company_id ON departments(company_id);
CREATE INDEX idx_employment_details_employee_id ON employment_details(employee_id);
CREATE INDEX idx_salaries_employee_id ON salaries(employee_id);
CREATE INDEX idx_payroll_runs_company_id ON payroll_runs(company_id);
CREATE INDEX idx_payroll_runs_payroll_cycle_id ON payroll_runs(payroll_cycle_id);
CREATE INDEX idx_payslip_items_payroll_run_id ON payslip_items(payroll_run_id);
CREATE INDEX idx_payslip_items_employee_id ON payslip_items(employee_id);
CREATE INDEX idx_benefits_company_id ON benefits(company_id);
CREATE INDEX idx_employee_benefits_employee_id ON employee_benefits(employee_id);
CREATE INDEX idx_employee_benefits_benefit_id ON employee_benefits(benefit_id);
CREATE INDEX idx_time_entries_employee_id ON time_entries(employee_id);
CREATE INDEX idx_time_entries_entry_date ON time_entries(entry_date);
CREATE INDEX idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_leave_type_id ON leave_requests(leave_type_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_job_postings_company_id ON job_postings(company_id);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_candidates_job_posting_id ON candidates(job_posting_id);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_interviews_candidate_id ON interviews(candidate_id);
CREATE INDEX idx_performance_reviews_employee_id ON performance_reviews(employee_id);
CREATE INDEX idx_goals_employee_id ON goals(employee_id);
CREATE INDEX idx_documents_company_id ON documents(company_id);
CREATE INDEX idx_documents_employee_id ON documents(employee_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource_type_resource_id ON audit_logs(resource_type, resource_id);

-- Insert default roles
INSERT INTO roles (name, description, is_system_role) VALUES
('Super Admin', 'Has full access to all system features', TRUE),
('Admin', 'Has administrative access to company features', TRUE),
('HR Manager', 'Manages HR functions and has access to sensitive employee data', TRUE),
('Payroll Manager', 'Manages payroll processing and has access to salary information', TRUE),
('Manager', 'Has access to manage their team members', TRUE),
('Employee', 'Basic employee access', TRUE);

-- Insert default permissions
INSERT INTO permissions (name, description, resource, action) VALUES
-- User permissions
('view_users', 'Can view user list', 'users', 'view'),
('create_users', 'Can create new users', 'users', 'create'),
('update_users', 'Can update user details', 'users', 'update'),
('delete_users', 'Can delete users', 'users', 'delete'),

-- Role permissions
('view_roles', 'Can view role list', 'roles', 'view'),
('create_roles', 'Can create new roles', 'roles', 'create'),
('update_roles', 'Can update role details', 'roles', 'update'),
('delete_roles', 'Can delete roles', 'roles', 'delete'),

-- Company permissions
('view_companies', 'Can view company details', 'companies', 'view'),
('create_companies', 'Can create new companies', 'companies', 'create'),
('update_companies', 'Can update company details', 'companies', 'update'),
('delete_companies', 'Can delete companies', 'companies', 'delete'),

-- Department permissions
('view_departments', 'Can view department list', 'departments', 'view'),
('create_departments', 'Can create new departments', 'departments', 'create'),
('update_departments', 'Can update department details', 'departments', 'update'),
('delete_departments', 'Can delete departments', 'departments', 'delete'),

-- Employee permissions
('view_employees', 'Can view employee list', 'employees', 'view'),
('create_employees', 'Can create new employees', 'employees', 'create'),
('update_employees', 'Can update employee details', 'employees', 'update'),
('delete_employees', 'Can delete employees', 'employees', 'delete'),
('view_employee_personal', 'Can view employee personal details', 'employees', 'view_personal'),

-- Payroll permissions
('view_payroll', 'Can view payroll information', 'payroll', 'view'),
('process_payroll', 'Can process payroll', 'payroll', 'process'),
('approve_payroll', 'Can approve payroll', 'payroll', 'approve'),
('view_payslips', 'Can view payslips', 'payslips', 'view'),
('create_payslips', 'Can create payslips', 'payslips', 'create'),

-- Benefits permissions
('view_benefits', 'Can view benefits', 'benefits', 'view'),
('manage_benefits', 'Can manage benefits', 'benefits', 'manage'),
('enroll_benefits', 'Can enroll in benefits', 'benefits', 'enroll'),

-- Time and attendance permissions
('view_time_entries', 'Can view time entries', 'time_entries', 'view'),
('create_time_entries', 'Can create time entries', 'time_entries', 'create'),
('approve_time_entries', 'Can approve time entries', 'time_entries', 'approve'),
('view_leave_requests', 'Can view leave requests', 'leave_requests', 'view'),
('create_leave_requests', 'Can create leave requests', 'leave_requests', 'create'),
('approve_leave_requests', 'Can approve leave requests', 'leave_requests', 'approve'),

-- Recruitment permissions
('view_job_postings', 'Can view job postings', 'job_postings', 'view'),
('manage_job_postings', 'Can manage job postings', 'job_postings', 'manage'),
('view_candidates', 'Can view candidates', 'candidates', 'view'),
('manage_candidates', 'Can manage candidates', 'candidates', 'manage'),
('schedule_interviews', 'Can schedule interviews', 'interviews', 'schedule'),

-- Performance permissions
('view_performance_reviews', 'Can view performance reviews', 'performance_reviews', 'view'),
('create_performance_reviews', 'Can create performance reviews', 'performance_reviews', 'create'),
('complete_performance_reviews', 'Can complete performance reviews', 'performance_reviews', 'complete'),
('view_goals', 'Can view goals', 'goals', 'view'),
('manage_goals', 'Can manage goals', 'goals', 'manage'),

-- Document permissions
('view_documents', 'Can view documents', 'documents', 'view'),
('upload_documents', 'Can upload documents', 'documents', 'upload'),
('delete_documents', 'Can delete documents', 'documents', 'delete'),

-- Report permissions
('view_reports', 'Can view reports', 'reports', 'view'),
('create_reports', 'Can create custom reports', 'reports', 'create'),
('export_reports', 'Can export reports', 'reports', 'export');

-- Assign permissions to roles
-- Super Admin gets all permissions
INSERT INTO user_permissions (role_id, permission_id)
SELECT 
    (SELECT id FROM roles WHERE name = 'Super Admin'),
    id
FROM permissions;

-- Admin role permissions
INSERT INTO user_permissions (role_id, permission_id)
SELECT 
    (SELECT id FROM roles WHERE name = 'Admin'),
    id
FROM permissions
WHERE name NOT IN ('delete_companies');

-- HR Manager permissions
INSERT INTO user_permissions (role_id, permission_id)
SELECT 
    (SELECT id FROM roles WHERE name = 'HR Manager'),
    id
FROM permissions
WHERE resource IN ('employees', 'departments', 'benefits', 'time_entries', 'leave_requests', 
                  'job_postings', 'candidates', 'interviews', 'performance_reviews', 
                  'goals', 'documents', 'reports')
   OR name IN ('view_users', 'create_users', 'update_users', 'view_companies');

-- Payroll Manager permissions
INSERT INTO user_permissions (role_id, permission_id)
SELECT 
    (SELECT id FROM roles WHERE name = 'Payroll Manager'),
    id
FROM permissions
WHERE resource IN ('payroll', 'payslips', 'time_entries', 'reports')
   OR name IN ('view_employees', 'view_employee_personal', 'view_companies', 'view_departments');

-- Manager permissions
INSERT INTO user_permissions (role_id, permission_id)
SELECT 
    (SELECT id FROM roles WHERE name = 'Manager'),
    id
FROM permissions
WHERE name IN ('view_employees', 'view_departments', 'approve_time_entries', 
              'approve_leave_requests', 'view_performance_reviews', 'create_performance_reviews',
              'complete_performance_reviews', 'view_goals', 'manage_goals');

-- Employee permissions
INSERT INTO user_permissions (role_id, permission_id)
SELECT 
    (SELECT id FROM roles WHERE name = 'Employee'),
    id
FROM permissions
WHERE name IN ('view_payslips', 'create_time_entries', 'create_leave_requests', 
              'view_leave_requests', 'view_benefits', 'enroll_benefits', 'view_documents',
              'upload_documents', 'view_goals');

-- Create a default super admin user (password: Admin@123)
INSERT INTO users (email, password_hash, first_name, last_name, is_active, is_email_verified)
VALUES ('admin@hrpayroll.com', '$2a$10$JmRDZDXNxYh.ZU1m7OhQiOUP1JsZ9vbZA.tUY7tOUOVf.QOtxz9Vy', 'System', 'Administrator', TRUE, TRUE);

-- Assign Super Admin role to the default admin user
INSERT INTO user_roles (user_id, role_id)
VALUES (
    (SELECT id FROM users WHERE email = 'admin@hrpayroll.com'),
    (SELECT id FROM roles WHERE name = 'Super Admin')
);

-- Create a sample company
INSERT INTO companies (name, legal_name, tax_id, industry, company_size, founded_date, fiscal_year_start, 
                      address_line1, city, state, postal_code, country, phone_number, email, website)
VALUES ('Acme Corporation', 'Acme Inc.', '12-3456789', 'Technology', '50-200', '2010-01-01', '2023-01-01',
        '123 Main Street', 'San Francisco', 'CA', '94105', 'United States', '(555) 123-4567', 
        'info@acmecorp.com', 'https://www.acmecorp.com');

-- Create sample departments
INSERT INTO departments (company_id, name, code, description)
VALUES 
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Human Resources', 'HR', 'Manages employee relations and HR functions'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Finance', 'FIN', 'Manages financial operations and accounting'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Engineering', 'ENG', 'Product development and technical operations'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Marketing', 'MKT', 'Marketing and brand management'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Sales', 'SLS', 'Sales and business development');

-- Create sample leave types
INSERT INTO leave_types (company_id, name, description, color, is_paid, accrual_rate, accrual_period, max_accrual)
VALUES
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Vacation', 'Annual vacation leave', '#4CAF50', TRUE, 10, 'Monthly', 120),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Sick Leave', 'Leave for illness or medical appointments', '#F44336', TRUE, 8, 'Monthly', 96),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Personal Leave', 'Leave for personal matters', '#2196F3', TRUE, 3, 'Monthly', 36),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Bereavement', 'Leave for family bereavement', '#9C27B0', TRUE, 0, 'None', 40),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Unpaid Leave', 'Leave without pay', '#607D8B', FALSE, 0, 'None', 0);

-- Create sample benefits
INSERT INTO benefits (company_id, name, description, benefit_type, provider, coverage_details, 
                     cost_to_company, cost_to_employee, effective_date, is_active)
VALUES
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Health Insurance - Basic', 'Basic health insurance plan', 'Health Insurance', 'BlueCross', 'Covers basic medical expenses with $1000 deductible', 500.00, 100.00, '2023-01-01', TRUE),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Health Insurance - Premium', 'Premium health insurance plan', 'Health Insurance', 'BlueCross', 'Comprehensive coverage with $500 deductible', 800.00, 200.00, '2023-01-01', TRUE),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Dental Insurance', 'Dental coverage', 'Dental Insurance', 'DentalPlus', 'Covers regular checkups and basic procedures', 100.00, 25.00, '2023-01-01', TRUE),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Vision Insurance', 'Vision coverage', 'Vision Insurance', 'VisionCare', 'Covers eye exams and partial glasses coverage', 50.00, 15.00, '2023-01-01', TRUE),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), '401(k) Retirement Plan', 'Retirement savings plan', 'Retirement', 'Fidelity', '3% employer match', 0.00, 0.00, '2023-01-01', TRUE);

-- Create sample payroll cycles
INSERT INTO payroll_cycles (company_id, name, frequency, start_date, end_date, payment_date)
VALUES
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Bi-weekly Cycle', 'Bi-weekly', '2023-01-01', '2023-01-14', '2023-01-20'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Monthly Cycle', 'Monthly', '2023-01-01', '2023-01-31', '2023-02-05');

-- Create sample shifts
INSERT INTO shifts (company_id, name, start_time, end_time, break_duration, days_of_week, color)
VALUES
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Morning Shift', '08:00:00', '16:00:00', 60, '1,2,3,4,5', '#4CAF50'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Afternoon Shift', '16:00:00', '00:00:00', 60, '1,2,3,4,5', '#2196F3'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Night Shift', '00:00:00', '08:00:00', 60, '1,2,3,4,5', '#9C27B0'),
    ((SELECT id FROM companies WHERE name = 'Acme Corporation'), 'Weekend Shift', '10:00:00', '18:00:00', 60, '6,7', '#FF9800');

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at column
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_roles_modtime BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_companies_modtime BEFORE UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_departments_modtime BEFORE UPDATE ON departments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_employees_modtime BEFORE UPDATE ON employees FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_employment_details_modtime BEFORE UPDATE ON employment_details FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_salaries_modtime BEFORE UPDATE ON salaries FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_deductions_modtime BEFORE UPDATE ON deductions FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_payroll_cycles_modtime BEFORE UPDATE ON payroll_cycles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_payroll_runs_modtime BEFORE UPDATE ON payroll_runs FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_payslip_items_modtime BEFORE UPDATE ON payslip_items FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_benefits_modtime BEFORE UPDATE ON benefits FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_employee_benefits_modtime BEFORE UPDATE ON employee_benefits FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_time_entries_modtime BEFORE UPDATE ON time_entries FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_leave_types_modtime BEFORE UPDATE ON leave_types FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_leave_requests_modtime BEFORE UPDATE ON leave_requests FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_shifts_modtime BEFORE UPDATE ON shifts FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_job_postings_modtime BEFORE UPDATE ON job_postings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_candidates_modtime BEFORE UPDATE ON candidates FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_interviews_modtime BEFORE UPDATE ON interviews FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_performance_reviews_modtime BEFORE UPDATE ON performance_reviews FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_goals_modtime BEFORE UPDATE ON goals FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_documents_modtime BEFORE UPDATE ON documents FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Create views for common queries

-- Employee Directory View
CREATE OR REPLACE VIEW employee_directory_view AS
SELECT 
    e.id,
    e.employee_id,
    e.first_name,
    e.last_name,
    e.work_email,
    e.work_phone,
    d.name AS department_name,
    ed.job_title,
    ed.employment_type,
    ed.employment_status,
    e2.first_name || ' ' || e2.last_name AS manager_name
FROM 
    employees e
LEFT JOIN 
    departments d ON e.department_id = d.id
LEFT JOIN 
    employment_details ed ON e.id = ed.employee_id
LEFT JOIN 
    employees e2 ON ed.reporting_manager_id = e2.id
WHERE 
    e.is_active = TRUE
    AND e.deleted_at IS NULL;

-- Payroll Summary View
CREATE OR REPLACE VIEW payroll_summary_view AS
SELECT 
    pr.id AS payroll_run_id,
    pr.start_date,
    pr.end_date,
    pr.payment_date,
    pr.status,
    c.name AS company_name,
    pc.name AS payroll_cycle_name,
    pc.frequency,
    COUNT(pi.id) AS employee_count,
    SUM(pi.gross_pay) AS total_gross_pay,
    SUM(pi.net_pay) AS total_net_pay,
    SUM(pi.federal_tax + pi.state_tax + pi.local_tax + pi.social_security_tax + pi.medicare_tax) AS total_taxes,
    SUM(pi.retirement_deduction + pi.health_insurance_deduction + pi.other_deductions) AS total_deductions
FROM 
    payroll_runs pr
JOIN 
    companies c ON pr.company_id = c.id
JOIN 
    payroll_cycles pc ON pr.payroll_cycle_id = pc.id
LEFT JOIN 
    payslip_items pi ON pr.id = pi.payroll_run_id
GROUP BY 
    pr.id, pr.start_date, pr.end_date, pr.payment_date, pr.status, c.name, pc.name, pc.frequency;

-- Leave Balance View
CREATE OR REPLACE VIEW leave_balance_view AS
WITH leave_taken AS (
    SELECT 
        lr.employee_id,
        lt.id AS leave_type_id,
        lt.name AS leave_type_name,
        SUM(lr.total_days) AS days_taken
    FROM 
        leave_requests lr
    JOIN 
        leave_types lt ON lr.leave_type_id = lt.id
    WHERE 
        lr.status = 'Approved'
        AND lr.start_date >= DATE_TRUNC('year', CURRENT_DATE)
    GROUP BY 
        lr.employee_id, lt.id, lt.name
)
SELECT 
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    lt.id AS leave_type_id,
    lt.name AS leave_type_name,
    lt.is_paid,
    CASE 
        WHEN lt.accrual_period = 'Monthly' THEN lt.accrual_rate * EXTRACT(MONTH FROM AGE(CURRENT_DATE, DATE_TRUNC('year', CURRENT_DATE)))
        WHEN lt.accrual_period = 'Quarterly' THEN lt.accrual_rate * FLOOR(EXTRACT(MONTH FROM AGE(CURRENT_DATE, DATE_TRUNC('year', CURRENT_DATE))) / 3)
        WHEN lt.accrual_period = 'Yearly' THEN lt.accrual_rate
        ELSE 0
    END AS accrued_days,
    COALESCE(lt2.days_taken, 0) AS days_taken,
    CASE 
        WHEN lt.accrual_period = 'Monthly' THEN lt.accrual_rate * EXTRACT(MONTH FROM AGE(CURRENT_DATE, DATE_TRUNC('year', CURRENT_DATE)))
        WHEN lt.accrual_period = 'Quarterly' THEN lt.accrual_rate * FLOOR(EXTRACT(MONTH FROM AGE(CURRENT_DATE, DATE_TRUNC('year', CURRENT_DATE))) / 3)
        WHEN lt.accrual_period = 'Yearly' THEN lt.accrual_rate
        ELSE 0
    END - COALESCE(lt2.days_taken, 0) AS balance
FROM 
    employees e
CROSS JOIN 
    leave_types lt
LEFT JOIN 
    leave_taken lt2 ON e.id = lt2.employee_id AND lt.id = lt2.leave_type_id
WHERE 
    e.is_active = TRUE
    AND e.deleted_at IS NULL
    AND lt.company_id = e.company_id;

-- Recruitment Pipeline View
CREATE OR REPLACE VIEW recruitment_pipeline_view AS
SELECT 
    jp.id AS job_posting_id,
    jp.title AS job_title,
    jp.status AS job_status,
    d.name AS department_name,
    COUNT(c.id) AS total_candidates,
    SUM(CASE WHEN c.status = 'New' THEN 1 ELSE 0 END) AS new_candidates,
    SUM(CASE WHEN c.status = 'Screening' THEN 1 ELSE 0 END) AS screening_candidates,
    SUM(CASE WHEN c.status = 'Interview' THEN 1 ELSE 0 END) AS interview_candidates,
    SUM(CASE WHEN c.status = 'Offer' THEN 1 ELSE 0 END) AS offer_candidates,
    SUM(CASE WHEN c.status = 'Hired' THEN 1 ELSE 0 END) AS hired_candidates,
    SUM(CASE WHEN c.status = 'Rejected' THEN 1 ELSE 0 END) AS rejected_candidates
FROM 
    job_postings jp
LEFT JOIN 
    departments d ON jp.department_id = d.id
LEFT JOIN 
    candidates c ON jp.id = c.job_posting_id
GROUP BY 
    jp.id, jp.title, jp.status, d.name;

-- Performance Review Summary View
CREATE OR REPLACE VIEW performance_review_summary_view AS
SELECT 
    d.name AS department_name,
    pr.review_type,
    EXTRACT(YEAR FROM pr.review_period_end) AS review_year,
    COUNT(pr.id) AS total_reviews,
    SUM(CASE WHEN pr.status = 'Completed' THEN 1 ELSE 0 END) AS completed_reviews,
    ROUND(AVG(pr.overall_rating), 2) AS average_rating,
    MIN(pr.overall_rating) AS min_rating,
    MAX(pr.overall_rating) AS max_rating
FROM 
    performance_reviews pr
JOIN 
    employees e ON pr.employee_id = e.id
LEFT JOIN 
    departments d ON e.department_id = d.id
GROUP BY 
    d.name, pr.review_type, EXTRACT(YEAR FROM pr.review_period_end);

-- Comment on database objects for documentation
COMMENT ON DATABASE postgres IS 'HR Payroll System Database';
COMMENT ON TABLE users IS 'Stores user account information for system access';
COMMENT ON TABLE roles IS 'Defines user roles for permission management';
COMMENT ON TABLE user_roles IS 'Junction table linking users to their roles';
COMMENT ON TABLE permissions IS 'Defines system permissions';
COMMENT ON TABLE user_permissions IS 'Junction table linking roles to their permissions';
COMMENT ON TABLE companies IS 'Stores company information';
COMMENT ON TABLE departments IS 'Stores department information within companies';
COMMENT ON TABLE employees IS 'Stores employee personal information';
COMMENT ON TABLE employment_details IS 'Stores employee job and employment details';
COMMENT ON TABLE salaries IS 'Stores employee salary information';
COMMENT ON TABLE deductions IS 'Defines payroll deduction types';
COMMENT ON TABLE payroll_cycles IS 'Defines payroll cycles for companies';
COMMENT ON TABLE payroll_runs IS 'Records of payroll processing runs';
COMMENT ON TABLE payslip_items IS 'Individual employee payslip details for each payroll run';
COMMENT ON TABLE benefits IS 'Defines benefit plans offered by companies';
COMMENT ON TABLE employee_benefits IS 'Records employee enrollment in benefit plans';
COMMENT ON TABLE time_entries IS 'Records employee time clock entries';
COMMENT ON TABLE leave_types IS 'Defines types of leave offered by companies';
COMMENT ON TABLE leave_requests IS 'Records employee leave requests';
COMMENT ON TABLE shifts IS 'Defines work shifts for scheduling';
COMMENT ON TABLE job_postings IS 'Stores job posting information';
COMMENT ON TABLE candidates IS 'Stores job candidate information';
COMMENT ON TABLE interviews IS 'Records candidate interview schedules and feedback';
COMMENT ON TABLE performance_reviews IS 'Stores employee performance review information';
COMMENT ON TABLE goals IS 'Stores employee performance goals';
COMMENT ON TABLE documents IS 'Stores document metadata and file locations';
COMMENT ON TABLE notifications IS 'Stores user notifications';
COMMENT ON TABLE audit_logs IS 'Records system activity for auditing purposes';

-- Grant privileges to default user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- Completed SQL setup
SELECT 'HR Payroll Database Setup Completed Successfully' AS status;
