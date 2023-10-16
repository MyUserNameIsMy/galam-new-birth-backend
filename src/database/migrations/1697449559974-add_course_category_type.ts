import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCourseCategoryType1697449559974 implements MigrationInterface {
    name = 'AddCourseCategoryType1697449559974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_626794960514393da07e942f8d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."courses_course_type_enum" AS ENUM('private', 'public_order', 'budget')`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "course_type" "public"."courses_course_type_enum" NOT NULL DEFAULT 'private'`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "courseCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_3b602b0cf7df363a93ae319f6f2" FOREIGN KEY ("courseCategoryId") REFERENCES "course_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_3b602b0cf7df363a93ae319f6f2"`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "courseCategoryId"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "course_type"`);
        await queryRunner.query(`DROP TYPE "public"."courses_course_type_enum"`);
        await queryRunner.query(`DROP TABLE "course_categories"`);
    }

}
