import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseCategoryEntity } from './entities/course-category.entity';
import { CourseCategoryController } from './controllers/course-category.controller';
import { CourseCategoryService } from './services/course-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CourseCategoryEntity])],
  controllers: [CourseController, CourseCategoryController],
  providers: [CourseService, CourseCategoryService],
})
export class CourseModule {}
