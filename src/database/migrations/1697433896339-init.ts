import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697433896339 implements MigrationInterface {
    name = 'Init1697433896339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."course_schedules_week_day_enum" AS ENUM('1', '2', '3', '4', '5', '6', '0')`);
        await queryRunner.query(`CREATE TABLE "course_schedules" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "week_day" "public"."course_schedules_week_day_enum" NOT NULL, "room" character varying NOT NULL, "coursePublicationId" integer, CONSTRAINT "PK_68118fc569f0c9ebb03fb79f80e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."week_days_week_day_enum" AS ENUM('1', '2', '3', '4', '5', '6', '0')`);
        await queryRunner.query(`CREATE TABLE "week_days" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "week_day" "public"."week_days_week_day_enum" NOT NULL, CONSTRAINT "UQ_8274555bc92686b68480c225da8" UNIQUE ("week_day"), CONSTRAINT "PK_65fd7c01f43e4828d0401b9c349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."course_publications_status_enum" AS ENUM('new', 'open_recruitment', 'close_recruitment', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "course_publications" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "capacity" integer NOT NULL, "status" "public"."course_publications_status_enum" NOT NULL DEFAULT 'new', "courseId" integer, CONSTRAINT "PK_45269197818fa4c2efb7d6f822a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "teacher" character varying NOT NULL, "hour_per_week" integer NOT NULL, "description" text NOT NULL, "requirements" text NOT NULL, "syllabus" text NOT NULL, "organizationId" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."organizations_status_enum" AS ENUM('ban', 'active', 'nonactive', 'new')`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "about" text NOT NULL, "address" character varying(255) NOT NULL, "location" geometry NOT NULL, "photo_path" character varying(500), "status" "public"."organizations_status_enum" NOT NULL DEFAULT 'new', "cityId" integer, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "countryId" integer, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(12) NOT NULL, "telegram_id" character varying(9) NOT NULL, "organizationId" integer, CONSTRAINT "REL_f3d6aea8fcca58182b2e80ce97" UNIQUE ("organizationId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_publications_week_days_week_days" ("coursePublicationsId" integer NOT NULL, "weekDaysId" integer NOT NULL, CONSTRAINT "PK_c583431b3dec5b56b4b281d7f20" PRIMARY KEY ("coursePublicationsId", "weekDaysId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26b12362d9fe7aa58a1f09cb3d" ON "course_publications_week_days_week_days" ("coursePublicationsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d330da32f8c41ddcf7417d524" ON "course_publications_week_days_week_days" ("weekDaysId") `);
        await queryRunner.query(`ALTER TABLE "course_schedules" ADD CONSTRAINT "FK_70eea6c6e314bd80752bba57911" FOREIGN KEY ("coursePublicationId") REFERENCES "course_publications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_publications" ADD CONSTRAINT "FK_65efd166b24b0a12dc4b92324f8" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "FK_254bedd01faa67a5765b5978789" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_publications_week_days_week_days" ADD CONSTRAINT "FK_26b12362d9fe7aa58a1f09cb3d9" FOREIGN KEY ("coursePublicationsId") REFERENCES "course_publications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_publications_week_days_week_days" ADD CONSTRAINT "FK_9d330da32f8c41ddcf7417d5245" FOREIGN KEY ("weekDaysId") REFERENCES "week_days"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_publications_week_days_week_days" DROP CONSTRAINT "FK_9d330da32f8c41ddcf7417d5245"`);
        await queryRunner.query(`ALTER TABLE "course_publications_week_days_week_days" DROP CONSTRAINT "FK_26b12362d9fe7aa58a1f09cb3d9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "FK_254bedd01faa67a5765b5978789"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6fb48f0fbdcb396d04d01f9e4a"`);
        await queryRunner.query(`ALTER TABLE "course_publications" DROP CONSTRAINT "FK_65efd166b24b0a12dc4b92324f8"`);
        await queryRunner.query(`ALTER TABLE "course_schedules" DROP CONSTRAINT "FK_70eea6c6e314bd80752bba57911"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d330da32f8c41ddcf7417d524"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26b12362d9fe7aa58a1f09cb3d"`);
        await queryRunner.query(`DROP TABLE "course_publications_week_days_week_days"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TYPE "public"."organizations_status_enum"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "course_publications"`);
        await queryRunner.query(`DROP TYPE "public"."course_publications_status_enum"`);
        await queryRunner.query(`DROP TABLE "week_days"`);
        await queryRunner.query(`DROP TYPE "public"."week_days_week_day_enum"`);
        await queryRunner.query(`DROP TABLE "course_schedules"`);
        await queryRunner.query(`DROP TYPE "public"."course_schedules_week_day_enum"`);
        await queryRunner.query(`DROP TABLE "countries"`);
    }

}
