import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class MockRbacSeed1715850946000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const filePath = path.resolve(__dirname, '../../mock_rbac_seed.sql');
        const sql = fs.readFileSync(filePath, 'utf8');
        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Bạn cần tạo file mock_rbac_seed_rollback.sql với các câu lệnh thu hồi phù hợp
        const rollbackPath = path.resolve(__dirname, '../../mock_rbac_seed_rollback.sql');
        if (fs.existsSync(rollbackPath)) {
            const rollbackSql = fs.readFileSync(rollbackPath, 'utf8');
            await queryRunner.query(rollbackSql);
        } else {
            throw new Error('Rollback SQL file not found: mock_rbac_seed_rollback.sql');
        }
    }
}
