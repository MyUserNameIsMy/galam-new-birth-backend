import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCourse1696451194747 implements MigrationInterface {
    name = 'AddCourse1696451194747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "teacher" character varying NOT NULL, "hour_per_week" integer NOT NULL, "description" text NOT NULL, "requirements" text NOT NULL, "syllabus" text NOT NULL, "organizationId" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."course_publications_status_enum" AS ENUM('new', 'open_recruitment', 'close_recruitment', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "course_publications" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "capacity" integer NOT NULL, "status" "public"."course_publications_status_enum" NOT NULL DEFAULT 'new', CONSTRAINT "PK_45269197818fa4c2efb7d6f822a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a"`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`DROP TABLE "course_publications"`);
        await queryRunner.query(`DROP TYPE "public"."course_publications_status_enum"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
