import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingDepartmentColumns1715101000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.department ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE public.department ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.department DROP COLUMN IF EXISTS created_at`,
    );
    await queryRunner.query(
      `ALTER TABLE public.department DROP COLUMN IF EXISTS updated_at`,
    );
  }
}
