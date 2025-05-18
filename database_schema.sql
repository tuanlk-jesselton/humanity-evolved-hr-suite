
--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Roles
CREATE TABLE roles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL,
    description TEXT
);

-- Permissions
CREATE TABLE permissions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL,
    description TEXT
);

-- User Roles (1 user có thể có nhiều role)
CREATE TABLE user_roles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE(user_id, role_id)
);

-- Role Permissions (1 role có thể có nhiều quyền)
CREATE TABLE role_permissions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE(role_id, permission_id)
);

-- User Permissions (quyền đặc biệt cho từng user, override role)
CREATE TABLE user_permissions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE(user_id, permission_id)
);

    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Companies (Tenants)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    logo_url TEXT,
    address TEXT,
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Roles
CREATE TYPE user_role AS ENUM ('Super Admin', 'Company Admin', 'Manager', 'Employee');

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role NOT NULL DEFAULT 'Employee',
    job_title VARCHAR(255),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
    profile_image_url TEXT,
    date_of_birth DATE,
    phone VARCHAR(50),
    address TEXT,
    hire_date DATE,
    employment_status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- User Documents
CREATE TABLE user_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    category VARCHAR(100),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Leave Types
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    default_days_per_year INT,
    color VARCHAR(20),
    requires_approval BOOLEAN DEFAULT true,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Leave Balances
CREATE TABLE leave_balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
    year INT NOT NULL,
    entitled_days DECIMAL(8,2) NOT NULL,
    carried_over_days DECIMAL(8,2) DEFAULT 0,
    additional_days DECIMAL(8,2) DEFAULT 0,
    taken_days DECIMAL(8,2) DEFAULT 0,
    pending_days DECIMAL(8,2) DEFAULT 0,
    remaining_days DECIMAL(8,2) GENERATED ALWAYS AS (entitled_days + carried_over_days + additional_days - taken_days - pending_days) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, leave_type_id, year)
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Leave Status
CREATE TYPE leave_status AS ENUM ('Pending', 'Approved', 'Rejected', 'Cancelled');

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Leave Requests
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days DECIMAL(5,2) NOT NULL,
    status leave_status NOT NULL DEFAULT 'Pending',
    reason TEXT,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Expense Categories
CREATE TABLE expense_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    requires_receipt BOOLEAN DEFAULT true,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Expense Status
CREATE TYPE expense_status AS ENUM ('Pending', 'Approved', 'Rejected', 'Paid');

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Expense Claims
CREATE TABLE expense_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expense_category_id UUID NOT NULL REFERENCES expense_categories(id) ON DELETE RESTRICT,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    date DATE NOT NULL,
    description TEXT,
    receipt_url TEXT,
    status expense_status NOT NULL DEFAULT 'Pending',
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    paid_date DATE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Payroll Components
CREATE TABLE payroll_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'Basic', 'Allowance', 'Deduction', 'Tax'
    description TEXT,
    tax_applicable BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Employee Salary Details
CREATE TABLE employee_salaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    effective_date DATE NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Salary Components
CREATE TABLE salary_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_salary_id UUID NOT NULL REFERENCES employee_salaries(id) ON DELETE CASCADE,
    payroll_component_id UUID NOT NULL REFERENCES payroll_components(id) ON DELETE RESTRICT,
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Payroll Runs
CREATE TABLE payroll_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    payment_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft', --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'Draft', 'Processing', 'Completed', 'Cancelled'
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Payslips
CREATE TABLE payslips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payroll_run_id UUID NOT NULL REFERENCES payroll_runs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    gross_pay DECIMAL(12,2) NOT NULL,
    total_deductions DECIMAL(12,2) NOT NULL,
    net_pay DECIMAL(12,2) NOT NULL,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (payroll_run_id, user_id)
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Payslip Items
CREATE TABLE payslip_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payslip_id UUID NOT NULL REFERENCES payslips(id) ON DELETE CASCADE,
    component_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'Earning', 'Deduction', 'Tax'
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Attendance Status
CREATE TYPE attendance_status AS ENUM ('Present', 'Absent', 'Half Day', 'Late', 'Leave', 'Holiday', 'Weekend');

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Attendance Records
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL,
    clock_in TIMESTAMP WITH TIME ZONE,
    clock_out TIMESTAMP WITH TIME ZONE,
    hours_worked DECIMAL(5,2),
    location_in POINT,
    location_out POINT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, date)
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Onboarding Templates
CREATE TABLE onboarding_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Onboarding Tasks
CREATE TABLE onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES onboarding_templates(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    days_to_complete INT,
    responsible_role user_role,
    sequence_order INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Onboarding User Tasks
CREATE TABLE user_onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES onboarding_tasks(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending', --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'Pending', 'In Progress', 'Completed', 'Overdue'
    due_date DATE,
    completion_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'Leave', 'Expense', 'Payroll', 'System', etc.
    related_entity_type VARCHAR(50), --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'leave_requests', 'expense_claims', etc.
    related_entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Audit Log
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'create', 'update', 'delete', 'login', 'logout', etc.
    entity_type VARCHAR(50), --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'users', 'leave_requests', etc.
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- System Settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT,
    data_type VARCHAR(50) DEFAULT 'string', --
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- 'string', 'number', 'boolean', 'json'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (company_id, category, key)
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Row-Level Security Policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_claims ENABLE ROW LEVEL SECURITY;

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Super Admin can access all companies
CREATE POLICY super_admin_companies_policy 
ON companies
FOR ALL 
TO PUBLIC
USING (EXISTS (SELECT 1 FROM users WHERE users.id = current_user_id() AND users.role = 'Super Admin'));

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Company Admin, Manager and Employee can only access their own company
CREATE POLICY company_users_policy
ON companies
FOR ALL
TO PUBLIC
USING (id = (SELECT company_id FROM users WHERE users.id = current_user_id()));

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- User policies
--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Super Admin and Company Admin can access all users in their company/companies
CREATE POLICY admin_users_policy
ON users
FOR ALL
TO PUBLIC
USING (
    (EXISTS (SELECT 1 FROM users u WHERE u.id = current_user_id() AND u.role = 'Super Admin'))
    OR
    (EXISTS (SELECT 1 FROM users u WHERE u.id = current_user_id() AND u.role = 'Company Admin' AND u.company_id = users.company_id))
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Managers can view users they manage
CREATE POLICY manager_users_policy
ON users
FOR SELECT
TO PUBLIC
USING (
    manager_id = current_user_id()
    OR
    id = current_user_id()
);

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Users can view their own data
CREATE POLICY self_users_policy
ON users
FOR SELECT
TO PUBLIC
USING (id = current_user_id());

--
-- HR Payroll Database Schema (chuẩn Gusto, đầy đủ các module)
--

-- Companies
CREATE TABLE companies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    owner_id INTEGER,
    employees_count INTEGER DEFAULT 0,
    compliance_status VARCHAR(32) NOT NULL CHECK (compliance_status IN ('Good', 'Warning', 'Missing')),
    payroll_health VARCHAR(32) NOT NULL CHECK (payroll_health IN ('Healthy', 'Issue', 'Pending')),
    status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('Super Admin', 'Company Admin', 'Manager', 'Employee')),
    company_id INTEGER REFERENCES companies(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Settings
CREATE TABLE company_settings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(64) NOT NULL,
    setting_value TEXT,
    UNIQUE(company_id, setting_key)
);

-- Audit Logs
CREATE TABLE audit_logs (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payrolls
CREATE TABLE payrolls (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Pending', 'Completed', 'Failed')),
    total_amount NUMERIC(18,2),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Items
CREATE TABLE payroll_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payroll_id INTEGER REFERENCES payrolls(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Pending', 'Paid', 'Failed'))
);

-- Compliance Checks
CREATE TABLE compliance_checks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    check_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL CHECK (result IN ('Good', 'Warning', 'Missing')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(128) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Open', 'Closed', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES users(id),
    reviewer_id INTEGER REFERENCES users(id),
    review_type VARCHAR(32) NOT NULL CHECK (review_type IN ('Self', 'Manager', 'Peer')),
    score NUMERIC(4,2),
    comments TEXT,
    status VARCHAR(32) NOT NULL CHECK (status IN ('Draft', 'Submitted', 'Finalized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Review Criteria
CREATE TABLE performance_review_criteria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cycle_id INTEGER REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

-- Performance Review Scores
CREATE TABLE performance_review_scores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id INTEGER REFERENCES performance_reviews(id) ON DELETE CASCADE,
    criteria_id INTEGER REFERENCES performance_review_criteria(id),
    score NUMERIC(4,2),
    comments TEXT
);

-- Functions for authentication
CREATE OR REPLACE FUNCTION current_user_id() 
RETURNS UUID AS $$
BEGIN
  RETURN current_setting('app.current_user_id', true)::UUID;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
