# Humanity HR Backend (NestJS)

This is a minimal NestJS backend for RBAC authentication demo.

## Scripts
- `npm install` — install dependencies
- `npm run start:dev` — start dev server (default: http://localhost:3000)

## Main API
- `POST /api/auth/login` — login with email/password, returns token and user roles

## Database
- Uses PostgreSQL. Configure connection in `src/app.module.ts`.
- Use `mock_rbac_seed.sql` to seed test data.
