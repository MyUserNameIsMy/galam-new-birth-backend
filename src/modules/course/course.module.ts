import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseCategoryEntity } from './entities/course-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CourseCategoryEntity])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
