import { MigrationInterface, QueryRunner } from 'typeorm';

export class SyncEmployeeCustomFieldValueColumns1715104000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Đổi tên cột value
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'employee_custom_field_value' AND column_name = 'value'
        ) THEN
          ALTER TABLE public.employee_custom_field_value 
          RENAME COLUMN field_value TO value;
        END IF;
      END$$;
    `);

    // Thêm cột created_at
    await queryRunner.query(`
      ALTER TABLE public.employee_custom_field_value 
      ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Đổi lại tên cột value
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'employee_custom_field_value' AND column_name = 'value'
        ) THEN
          ALTER TABLE public.employee_custom_field_value 
          RENAME COLUMN value TO field_value;
        END IF;
      END$$;
    `);

    // Xóa cột created_at
    await queryRunner.query(`
      ALTER TABLE public.employee_custom_field_value 
      DROP COLUMN IF EXISTS created_at
    `);
  }
}
