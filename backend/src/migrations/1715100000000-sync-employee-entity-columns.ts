import { MigrationInterface, QueryRunner } from 'typeorm';

export class SyncEmployeeEntityColumns1715100000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.employee ADD COLUMN IF NOT EXISTS user_id varchar UNIQUE`,
    );
    await queryRunner.query(
      `ALTER TABLE public.employee ADD COLUMN IF NOT EXISTS country_id varchar`,
    );
    await queryRunner.query(
      `ALTER TABLE public.employee ADD COLUMN IF NOT EXISTS manager_id varchar`,
    );
    await queryRunner.query(
      `ALTER TABLE public.employee ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.employee DROP COLUMN IF EXISTS user_id`,
    );
    await queryRunner.query(
      `ALTER TABLE public.employee DROP COLUMN IF EXISTS country_id`,
    );
    await queryRunner.query(
      `ALTER TABLE public.employee DROP COLUMN IF EXISTS manager_id`,
    );
    await queryRunner.query(
      `ALTER TABLE public.employee DROP COLUMN IF EXISTS updated_at`,
    );
  }
}
