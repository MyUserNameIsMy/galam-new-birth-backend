import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelation1698596794677 implements MigrationInterface {
    name = 'FixRelation1698596794677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "organizationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a"`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "organizationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
