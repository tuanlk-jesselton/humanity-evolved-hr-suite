
-- HumanityHR - Comprehensive PostgreSQL Schema for Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Companies (Tenants) Table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    logo_url TEXT,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(50),
    website VARCHAR(255),
    industry VARCHAR(100),
    established_date DATE,
    tax_id VARCHAR(100),
    registration_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Locations
CREATE TABLE company_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    is_headquarters BOOLEAN DEFAULT false,
    address TEXT NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    location_id UUID REFERENCES company_locations(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    department_head_id UUID, -- Will be updated later with FK constraint to users
    parent_department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Roles
CREATE TYPE user_role AS ENUM ('Super Admin', 'Company Admin', 'Manager', 'Employee');

-- Employment Status Types
CREATE TYPE employment_status AS ENUM ('Full-Time', 'Part-Time', 'Contract', 'Intern', 'Probation', 'Terminated', 'On Leave');

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id VARCHAR(255) UNIQUE, -- For Supabase Auth integration
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role NOT NULL DEFAULT 'Employee',
    job_title VARCHAR(255),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
    profile_image_url TEXT,
    date_of_birth DATE,
    phone VARCHAR(50),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    hire_date DATE,
    employee_id VARCHAR(100), -- Company employee ID (not the same as auth_id or id)
    employment_status employment_status DEFAULT 'Full-Time',
    termination_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update the department table to properly reference the head
ALTER TABLE departments 
ADD CONSTRAINT fk_department_head 
FOREIGN KEY (department_head_id) REFERENCES users(id) ON DELETE SET NULL;

-- User Documents
CREATE TABLE user_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    category VARCHAR(100),
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave Types
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    default_days_per_year DECIMAL(8,2),
    color VARCHAR(20),
    requires_approval BOOLEAN DEFAULT true,
    paid BOOLEAN DEFAULT true,
    is_prorated BOOLEAN DEFAULT true,
    accrual_frequency VARCHAR(50) DEFAULT 'Monthly', -- Monthly, Quarterly, Yearly
    accrual_amount DECIMAL(8,2) DEFAULT 0,
    max_carryover_days DECIMAL(8,2),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
    last_accrual_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, leave_type_id, year)
);

-- Leave Status
CREATE TYPE leave_status AS ENUM ('Pending', 'Approved', 'Rejected', 'Cancelled');

-- Leave Requests
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_half_day BOOLEAN DEFAULT false,
    end_half_day BOOLEAN DEFAULT false,
    days DECIMAL(5,2) NOT NULL,
    status leave_status NOT NULL DEFAULT 'Pending',
    reason TEXT,
    attachment_url TEXT,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave Comments
CREATE TABLE leave_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    leave_request_id UUID NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Holidays
CREATE TABLE holidays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    is_recurring BOOLEAN DEFAULT true,
    location_id UUID REFERENCES company_locations(id) ON DELETE SET NULL, -- NULL means applicable to all locations
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense Categories
CREATE TABLE expense_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    requires_receipt BOOLEAN DEFAULT true,
    tax_deductible BOOLEAN DEFAULT false,
    gl_account VARCHAR(100), -- Accounting GL account code
    expense_account VARCHAR(100), -- Accounting expense account code
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense Status
CREATE TYPE expense_status AS ENUM ('Draft', 'Submitted', 'Pending', 'Approved', 'Rejected', 'Paid');

-- Expense Claims
CREATE TABLE expense_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    total_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status expense_status NOT NULL DEFAULT 'Draft',
    submitted_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    paid_date DATE,
    rejection_reason TEXT,
    payment_method VARCHAR(100),
    payment_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense Items
CREATE TABLE expense_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_claim_id UUID NOT NULL REFERENCES expense_claims(id) ON DELETE CASCADE,
    expense_category_id UUID NOT NULL REFERENCES expense_categories(id) ON DELETE RESTRICT,
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    description TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense Comments
CREATE TABLE expense_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_claim_id UUID NOT NULL REFERENCES expense_claims(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll Tax Tables (For different countries/regions)
CREATE TABLE tax_tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    country VARCHAR(100) NOT NULL,
    region VARCHAR(100), -- State/Province
    name VARCHAR(255) NOT NULL,
    description TEXT,
    effective_from DATE NOT NULL,
    effective_to DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax Brackets
CREATE TABLE tax_brackets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tax_table_id UUID NOT NULL REFERENCES tax_tables(id) ON DELETE CASCADE,
    lower_limit DECIMAL(12,2) NOT NULL,
    upper_limit DECIMAL(12,2),
    fixed_amount DECIMAL(12,2) DEFAULT 0,
    rate DECIMAL(6,4) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll Components
CREATE TABLE payroll_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'Basic', 'Allowance', 'Deduction', 'Tax', 'Contribution', 'Reimbursement'
    description TEXT,
    recurring BOOLEAN DEFAULT true,
    taxable BOOLEAN DEFAULT false,
    affects_gross BOOLEAN DEFAULT true,
    calculation_type VARCHAR(50) DEFAULT 'Fixed', -- 'Fixed', 'Percentage', 'Formula'
    calculation_basis VARCHAR(50), -- Base component for percentage calculation
    formula TEXT, -- For complex calculations
    gl_account VARCHAR(100), -- General ledger account
    active BOOLEAN DEFAULT true,
    sequence_order INT DEFAULT 0, -- For controlling order of calculations
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee Salary Details
CREATE TABLE employee_salaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    effective_date DATE NOT NULL,
    end_date DATE,
    salary_type VARCHAR(50) NOT NULL DEFAULT 'Monthly', -- 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Annual'
    base_salary DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    pay_frequency VARCHAR(50) DEFAULT 'Monthly', -- 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly'
    hours_per_week DECIMAL(5,2),
    days_per_week INT,
    payment_method VARCHAR(50) DEFAULT 'Bank Transfer', -- 'Bank Transfer', 'Check', 'Cash'
    bank_name VARCHAR(100),
    bank_account VARCHAR(100),
    bank_routing VARCHAR(100),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT salary_date_overlap CHECK (
        end_date IS NULL OR effective_date < end_date
    )
);

-- Salary Components
CREATE TABLE salary_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_salary_id UUID NOT NULL REFERENCES employee_salaries(id) ON DELETE CASCADE,
    payroll_component_id UUID NOT NULL REFERENCES payroll_components(id) ON DELETE RESTRICT,
    amount DECIMAL(12,2),
    percentage DECIMAL(6,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll Runs
CREATE TABLE payroll_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    payment_date DATE NOT NULL,
    pay_frequency VARCHAR(50) NOT NULL, -- 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly'
    status VARCHAR(50) NOT NULL DEFAULT 'Draft', -- 'Draft', 'Processing', 'Completed', 'Cancelled'
    notes TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payslips
CREATE TABLE payslips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payroll_run_id UUID NOT NULL REFERENCES payroll_runs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    employee_salary_id UUID NOT NULL REFERENCES employee_salaries(id) ON DELETE RESTRICT,
    base_salary DECIMAL(12,2) NOT NULL,
    gross_pay DECIMAL(12,2) NOT NULL,
    total_deductions DECIMAL(12,2) NOT NULL,
    net_pay DECIMAL(12,2) NOT NULL,
    total_tax DECIMAL(12,2) NOT NULL,
    total_employer_contributions DECIMAL(12,2) DEFAULT 0,
    pdf_url TEXT,
    sent BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (payroll_run_id, user_id)
);

-- Payslip Items
CREATE TABLE payslip_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payslip_id UUID NOT NULL REFERENCES payslips(id) ON DELETE CASCADE,
    payroll_component_id UUID REFERENCES payroll_components(id) ON DELETE RESTRICT,
    component_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'Earning', 'Deduction', 'Tax', 'Employer Contribution'
    amount DECIMAL(12,2) NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    rate DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance Status
CREATE TYPE attendance_status AS ENUM ('Present', 'Absent', 'Half Day', 'Late', 'Leave', 'Holiday', 'Weekend');

-- Attendance Records
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL,
    clock_in TIMESTAMP WITH TIME ZONE,
    clock_out TIMESTAMP WITH TIME ZONE,
    hours_worked DECIMAL(5,2),
    break_minutes INT DEFAULT 0,
    overtime_minutes INT DEFAULT 0,
    location_in POINT,
    location_in_address TEXT,
    location_out POINT,
    location_out_address TEXT,
    notes TEXT,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, date)
);

-- Attendance Corrections
CREATE TABLE attendance_corrections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attendance_id UUID NOT NULL REFERENCES attendance_records(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    original_clock_in TIMESTAMP WITH TIME ZONE,
    original_clock_out TIMESTAMP WITH TIME ZONE,
    corrected_clock_in TIMESTAMP WITH TIME ZONE,
    corrected_clock_out TIMESTAMP WITH TIME ZONE,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work Schedules
CREATE TABLE work_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work Schedule Details
CREATE TABLE work_schedule_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_id UUID NOT NULL REFERENCES work_schedules(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday, 6 = Saturday
    is_working_day BOOLEAN DEFAULT true,
    work_start TIME,
    work_end TIME,
    break_minutes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (schedule_id, day_of_week)
);

-- User Work Schedules
CREATE TABLE user_work_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    schedule_id UUID NOT NULL REFERENCES work_schedules(id) ON DELETE CASCADE,
    effective_date DATE NOT NULL,
    end_date DATE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT work_schedule_date_overlap CHECK (
        end_date IS NULL OR effective_date < end_date
    )
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

-- Onboarding User Tasks
CREATE TABLE user_onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES onboarding_tasks(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'In Progress', 'Completed', 'Overdue'
    due_date DATE,
    completion_date DATE,
    completion_notes TEXT,
    attachments TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offboarding Templates
CREATE TABLE offboarding_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offboarding Tasks
CREATE TABLE offboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES offboarding_templates(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    days_to_complete INT,
    responsible_role user_role,
    sequence_order INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Offboarding
CREATE TABLE user_offboarding (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    template_id UUID REFERENCES offboarding_templates(id) ON DELETE SET NULL,
    termination_date DATE NOT NULL,
    reason VARCHAR(255),
    exit_notes TEXT,
    exit_interview_date DATE,
    exit_interviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Offboarding Tasks
CREATE TABLE user_offboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_offboarding_id UUID NOT NULL REFERENCES user_offboarding(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES offboarding_tasks(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'In Progress', 'Completed'
    due_date DATE,
    completion_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Review Cycles
CREATE TABLE performance_review_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft', -- 'Draft', 'Active', 'Completed', 'Cancelled'
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Review Templates
CREATE TABLE performance_review_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Review Questions
CREATE TABLE performance_review_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES performance_review_templates(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- 'Rating', 'Text', 'Multiple Choice'
    options JSONB, -- For multiple choice questions
    weight INT DEFAULT 1,
    category VARCHAR(100),
    required BOOLEAN DEFAULT true,
    sequence_order INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cycle_id UUID NOT NULL REFERENCES performance_review_cycles(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES performance_review_templates(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Draft', -- 'Draft', 'Submitted', 'Under Review', 'Completed', 'Cancelled'
    overall_rating DECIMAL(3,2),
    review_date DATE,
    submission_date TIMESTAMP WITH TIME ZONE,
    completion_date TIMESTAMP WITH TIME ZONE,
    feedback TEXT,
    private_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Review Answers
CREATE TABLE performance_review_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES performance_reviews(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES performance_review_questions(id) ON DELETE CASCADE,
    answer TEXT,
    rating DECIMAL(3,2),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Goals
CREATE TABLE performance_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    due_date DATE,
    status VARCHAR(50) DEFAULT 'Not Started', -- 'Not Started', 'In Progress', 'Completed', 'Cancelled'
    progress INT DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    priority VARCHAR(50) DEFAULT 'Medium', -- 'Low', 'Medium', 'High'
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Benefit Plans
CREATE TABLE benefit_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    benefit_type VARCHAR(100) NOT NULL, -- 'Health Insurance', 'Dental', 'Vision', '401k', etc.
    provider VARCHAR(255),
    policy_number VARCHAR(255),
    coverage_details TEXT,
    effective_date DATE NOT NULL,
    end_date DATE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Benefits
CREATE TABLE user_benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    benefit_plan_id UUID NOT NULL REFERENCES benefit_plans(id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL,
    coverage_level VARCHAR(100), -- 'Employee Only', 'Employee + Spouse', 'Family', etc.
    employee_contribution DECIMAL(12,2),
    employer_contribution DECIMAL(12,2),
    contribution_frequency VARCHAR(50) DEFAULT 'Monthly', -- 'Weekly', 'Bi-Weekly', 'Monthly'
    notes TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, benefit_plan_id)
);

-- Company Policies
CREATE TABLE company_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    version VARCHAR(50),
    effective_date DATE NOT NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Policy Acknowledgements
CREATE TABLE policy_acknowledgements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    policy_id UUID NOT NULL REFERENCES company_policies(id) ON DELETE CASCADE,
    acknowledged_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, policy_id)
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'Leave', 'Expense', 'Payroll', 'Performance', 'System', etc.
    related_entity_type VARCHAR(50), -- 'leave_requests', 'expense_claims', etc.
    related_entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Log for tracking important actions
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout', etc.
    entity_type VARCHAR(50), -- 'users', 'leave_requests', etc.
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings for each company
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT,
    data_type VARCHAR(50) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (company_id, category, key)
);

-- Company Integrations
CREATE TABLE company_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL, -- 'Slack', 'Google', 'Microsoft', 'Zoom', etc.
    integration_type VARCHAR(100) NOT NULL, -- 'SSO', 'Calendar', 'Communication', 'Accounting', etc.
    config JSONB,
    credentials JSONB,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Subscription Plans
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    billing_cycle VARCHAR(50) DEFAULT 'Monthly', -- 'Monthly', 'Annual'
    max_users INT,
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Subscriptions
CREATE TABLE company_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'Active', -- 'Trial', 'Active', 'Cancelled', 'Expired'
    payment_method VARCHAR(100),
    payment_reference VARCHAR(255),
    auto_renew BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription Invoices
CREATE TABLE subscription_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID NOT NULL REFERENCES company_subscriptions(id) ON DELETE CASCADE,
    invoice_number VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    tax DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    billing_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Paid', 'Overdue', 'Cancelled'
    payment_date DATE,
    payment_method VARCHAR(100),
    payment_reference VARCHAR(255),
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row-Level Security Policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE payrolls ENABLE ROW LEVEL SECURITY;

-- Create functions for authentication and RLS
CREATE OR REPLACE FUNCTION get_current_user_id() 
RETURNS UUID AS $$
BEGIN
  RETURN auth.uid();
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_role() 
RETURNS user_role AS $$
DECLARE
  v_role user_role;
BEGIN
  SELECT role INTO v_role FROM users WHERE id = get_current_user_id();
  RETURN v_role;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_company_id() 
RETURNS UUID AS $$
DECLARE
  v_company_id UUID;
BEGIN
  SELECT company_id INTO v_company_id FROM users WHERE id = get_current_user_id();
  RETURN v_company_id;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Row Security Policies

-- Super Admin can access all companies
CREATE POLICY super_admin_companies_policy 
ON companies
FOR ALL 
USING (get_user_role() = 'Super Admin');

-- Company Admin, Manager and Employee can only access their own company
CREATE POLICY company_users_policy
ON companies
FOR ALL
USING (id = get_user_company_id());

-- User policies
-- Super Admin can access all users
CREATE POLICY super_admin_users_policy
ON users
FOR ALL
USING (get_user_role() = 'Super Admin');

-- Company Admin can access all users in their company
CREATE POLICY company_admin_users_policy
ON users
FOR ALL
USING (
  get_user_role() = 'Company Admin' AND company_id = get_user_company_id()
);

-- Managers can view and update users they manage
CREATE POLICY manager_users_policy
ON users
FOR SELECT
USING (
  get_user_role() = 'Manager' AND 
  (manager_id = get_current_user_id() OR id = get_current_user_id())
);

-- Create policy for payroll access
CREATE POLICY payroll_admin_policy
ON payroll_runs
FOR ALL
USING (
  get_user_role() IN ('Super Admin', 'Company Admin') AND
  company_id = get_user_company_id()
);

-- Create policy for leave requests
CREATE POLICY leave_requests_view_policy
ON leave_requests
FOR SELECT
USING (
  user_id = get_current_user_id() OR
  get_user_role() IN ('Super Admin', 'Company Admin') OR
  (get_user_role() = 'Manager' AND 
   EXISTS (SELECT 1 FROM users WHERE manager_id = get_current_user_id() AND id = leave_requests.user_id))
);

CREATE POLICY leave_requests_modify_policy
ON leave_requests
FOR INSERT
WITH CHECK (
  user_id = get_current_user_id()
);

CREATE POLICY leave_requests_update_policy
ON leave_requests
FOR UPDATE
USING (
  user_id = get_current_user_id() OR
  (get_user_role() = 'Manager' AND 
   EXISTS (SELECT 1 FROM users WHERE manager_id = get_current_user_id() AND id = leave_requests.user_id)) OR
  get_user_role() IN ('Super Admin', 'Company Admin')
);

-- Create policy for expense claims
CREATE POLICY expense_claims_view_policy
ON expense_claims
FOR SELECT
USING (
  user_id = get_current_user_id() OR
  get_user_role() IN ('Super Admin', 'Company Admin') OR
  (get_user_role() = 'Manager' AND 
   EXISTS (SELECT 1 FROM users WHERE manager_id = get_current_user_id() AND id = expense_claims.user_id))
);

CREATE POLICY expense_claims_modify_policy
ON expense_claims
FOR INSERT
WITH CHECK (
  user_id = get_current_user_id()
);

CREATE POLICY expense_claims_update_policy
ON expense_claims
FOR UPDATE
USING (
  user_id = get_current_user_id() OR
  (get_user_role() = 'Manager' AND 
   EXISTS (SELECT 1 FROM users WHERE manager_id = get_current_user_id() AND id = expense_claims.user_id)) OR
  get_user_role() IN ('Super Admin', 'Company Admin')
);

-- Default Super Admin user (you'll need to update password via Supabase Auth)
INSERT INTO companies (id, name, domain)
VALUES (
  'f0da5d0e-eaa0-4a65-8718-3858b443eba9',
  'HumanityHR Platform',
  'humanityhr.com'
);

INSERT INTO users (
  id, 
  company_id, 
  email, 
  first_name,
  last_name,
  role,
  job_title
)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'f0da5d0e-eaa0-4a65-8718-3858b443eba9',
  'admin@humanityhr.com',
  'Admin',
  'User',
  'Super Admin',
  'Platform Administrator'
);
