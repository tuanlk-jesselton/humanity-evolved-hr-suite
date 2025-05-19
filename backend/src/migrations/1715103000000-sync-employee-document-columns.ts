import { MigrationInterface, QueryRunner } from 'typeorm';

export class SyncEmployeeDocumentColumns1715103000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Thêm document_type
    await queryRunner.query(`
      ALTER TABLE public.employee_document 
      ADD COLUMN IF NOT EXISTS document_type varchar(100)
    `);

    // Đổi file_url thành file_path
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'employee_document' AND column_name = 'file_url'
        ) THEN
          ALTER TABLE public.employee_document 
          RENAME COLUMN file_url TO file_path;
        END IF;
      END$$;
    `);

    // Thêm uploaded_at
    await queryRunner.query(`
      ALTER TABLE public.employee_document 
      ADD COLUMN IF NOT EXISTS uploaded_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.employee_document 
      DROP COLUMN IF EXISTS document_type
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'employee_document' AND column_name = 'file_path'
        ) THEN
          ALTER TABLE public.employee_document 
          RENAME COLUMN file_path TO file_url;
        END IF;
      END$$;
    `);

    await queryRunner.query(`
      ALTER TABLE public.employee_document 
      DROP COLUMN IF EXISTS uploaded_at
    `);
  }
}
