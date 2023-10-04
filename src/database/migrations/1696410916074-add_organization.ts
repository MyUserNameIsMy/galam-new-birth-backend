import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrganization1696410916074 implements MigrationInterface {
    name = 'AddOrganization1696410916074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."organizations_status_enum" AS ENUM('ban', 'active', 'nonactive', 'new')`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "status" "public"."organizations_status_enum" NOT NULL DEFAULT 'new'`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "cityId" integer`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "FK_254bedd01faa67a5765b5978789" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "FK_254bedd01faa67a5765b5978789"`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."organizations_status_enum"`);
    }

}
