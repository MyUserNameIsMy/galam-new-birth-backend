import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseCategoryEntity } from '../course-category/entities/course-category.entity';
import { CourseCategoryController } from '../course-category/course-category.controller';
import { CourseCategoryService } from '../course-category/course-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CourseCategoryEntity])],
  controllers: [CourseController, CourseCategoryController],
  providers: [CourseService, CourseCategoryService],
})
export class CourseModule {}
