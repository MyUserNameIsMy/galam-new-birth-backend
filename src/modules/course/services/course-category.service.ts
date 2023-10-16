import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseCategoryDto } from '../dto/create-course-category.dto';
import { CourseCategoryEntity } from '../entities/course-category.entity';

@Injectable()
export class CourseCategoryService {
  async create(createCourseCategoryDto: CreateCourseCategoryDto) {
    try {
      const course_category = new CourseCategoryEntity();
      course_category.name = createCourseCategoryDto.name;
      return await course_category.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll() {
    return await CourseCategoryEntity.find();
  }

  async findOne(id: number) {
    try {
      return await CourseCategoryEntity.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
