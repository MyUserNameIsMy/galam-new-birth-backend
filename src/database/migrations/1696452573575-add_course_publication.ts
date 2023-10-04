import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoursePublication1696452573575 implements MigrationInterface {
    name = 'AddCoursePublication1696452573575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_publications" ADD "courseId" integer`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "course_publications" ADD CONSTRAINT "FK_65efd166b24b0a12dc4b92324f8" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_publications" DROP CONSTRAINT "FK_65efd166b24b0a12dc4b92324f8"`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "course_publications" DROP COLUMN "courseId"`);
    }

}
