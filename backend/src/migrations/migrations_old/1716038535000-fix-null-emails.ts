import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNullEmails1716038535000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, check if the column exists and has NULL values
        const hasNullEmails = await queryRunner.query(`
            SELECT EXISTS (
                SELECT 1 FROM users WHERE email IS NULL
            ) as has_nulls;
        `);

        if (hasNullEmails[0]?.has_nulls) {
            // Update any NULL emails to a default value
            await queryRunner.query(`
                UPDATE users 
                SET email = CONCAT('user_', id::text, '@example.com')
                WHERE email IS NULL;
            `);
            console.log('Updated NULL emails with default values');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // This is a one-way migration, but we keep the method for consistency
    }
}
