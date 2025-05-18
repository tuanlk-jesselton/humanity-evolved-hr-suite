-- Seed data for RBAC testing

-- 1. Companies (sử dụng CTE để lấy ID)
WITH inserted_companies AS (
  INSERT INTO companies (name, email, status, compliance_status, payroll_health)
  VALUES
    ('Acme Corp', 'acme@company.com', 'Active', 'Good', 'Healthy'),
    ('Beta Inc', 'beta@company.com', 'Active', 'Good', 'Healthy')
  RETURNING id
),
company_ids AS (
  SELECT id FROM inserted_companies
  ORDER BY id
  LIMIT 1
)
-- 2. Users (sử dụng ID từ bảng companies)
INSERT INTO users (email, password_hash, full_name, company_id, is_active)
SELECT * FROM (
  VALUES
    ('superadmin@company.com', 'hashed_pw1', 'Super Admin User', (SELECT id FROM company_ids), true),
    ('admin@company.com', 'hashed_pw2', 'Company Admin User', (SELECT id FROM company_ids), true),
    ('manager@company.com', 'hashed_pw3', 'Manager User', (SELECT id FROM company_ids), true),
    ('employee@company.com', 'hashed_pw4', 'Employee User', (SELECT id FROM company_ids), true),
    ('multi@company.com', 'hashed_pw5', 'Multi Role User', (SELECT id FROM company_ids), true)
) AS user_data;

-- 3. Roles
INSERT INTO roles (name, description) VALUES
  ('Super Admin', 'Super administrator'),
  ('Company Admin', 'Company administrator'),
  ('Manager', 'Manager'),
  ('Employee', 'Employee');

-- 4. User Roles
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE 
  (u.email = 'superadmin@company.com' AND r.name = 'Super Admin') OR
  (u.email = 'admin@company.com' AND r.name = 'Company Admin') OR
  (u.email = 'manager@company.com' AND r.name = 'Manager') OR
  (u.email = 'employee@company.com' AND r.name = 'Employee') OR
  (u.email = 'multi@company.com' AND r.name IN ('Manager', 'Employee'));

-- 5. Permissions
INSERT INTO permissions (name, description) VALUES
  ('view_payroll', 'View payroll'),
  ('edit_payroll', 'Edit payroll'),
  ('manage_users', 'Manage users');

-- 6. Role Permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE 
  (r.name = 'Super Admin') OR
  (r.name = 'Company Admin' AND p.name IN ('view_payroll', 'edit_payroll')) OR
  (r.name = 'Manager' AND p.name = 'view_payroll') OR
  (r.name = 'Employee' AND p.name = 'view_payroll')
