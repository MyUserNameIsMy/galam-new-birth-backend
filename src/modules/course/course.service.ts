import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { OrganizationEntity } from '../organization/entities/organization.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class CourseService {
  async create(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    const organization = await OrganizationEntity.findOne({
      where: { id: createCourseDto.organization_id },
    });
    if (!organization) throw new BadRequestException('No such Organization');

    try {
      const course = new CourseEntity();
      course.name = createCourseDto.name;
      course.teacher = createCourseDto.teacher;
      course.hour_per_week = createCourseDto.hour_per_week;
      course.description = createCourseDto.description;
      course.requirements = createCourseDto.requirements;
      course.syllabus = createCourseDto.syllabus;
      course.organization = organization;
      return await course.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<CourseEntity[]> {
    return await CourseEntity.find();
  }

  async findOne(id: number): Promise<CourseEntity> {
    return await CourseEntity.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<{ message: string }> {
    try {
      await CourseEntity.update({ id }, updateCourseDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully updated',
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const organization = await OrganizationEntity.findOneOrFail({
        where: { id },
      });
      await organization.remove();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully deleted',
    };
  }
}
