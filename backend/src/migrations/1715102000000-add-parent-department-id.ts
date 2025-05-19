import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddParentDepartmentId1715102000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.department ADD COLUMN IF NOT EXISTS parent_department_id uuid`,
    );
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_type = 'FOREIGN KEY'
            AND table_name = 'department'
            AND constraint_name = 'fk_department_parent'
        ) THEN
          ALTER TABLE public.department
          ADD CONSTRAINT fk_department_parent FOREIGN KEY (parent_department_id)
          REFERENCES public.department(id)
          ON DELETE SET NULL;
        END IF;
      END$$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.department DROP CONSTRAINT IF EXISTS fk_department_parent`,
    );
    await queryRunner.query(
      `ALTER TABLE public.department DROP COLUMN IF EXISTS parent_department_id`,
    );
  }
}
