import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCoursePublicationDto } from './dto/create-course-publication.dto';
import { UpdateCoursePublicationDto } from './dto/update-course-publication.dto';
import { CoursePublicationEntity } from './entities/course-publication.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { CountryEntity } from '../country/entities/country.entity';

@Injectable()
export class CoursePublicationService {
  async create(
    createCoursePublicationDto: CreateCoursePublicationDto,
  ): Promise<CoursePublicationEntity> {
    try {
      const course = await CourseEntity.findOneOrFail({
        where: { id: createCoursePublicationDto.course_id },
      });

      const course_publication = new CoursePublicationEntity();
      course_publication.start_date = createCoursePublicationDto.start_date;
      course_publication.end_date = createCoursePublicationDto.end_date;
      course_publication.capacity = createCoursePublicationDto.capacity;
      course_publication.course = course;

      return await course_publication.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<CoursePublicationEntity[]> {
    return await CoursePublicationEntity.find();
  }

  async findOne(id: number) {
    try {
      return await CoursePublicationEntity.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateStatus(
    id: number,
    updateCoursePublicationDto: UpdateCoursePublicationDto,
  ): Promise<{ message: string }> {
    try {
      await CoursePublicationEntity.update({ id }, updateCoursePublicationDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully updated',
    };
  }

  async remove(id: number) {
    try {
      const course_publication = await CoursePublicationEntity.findOneOrFail({
        where: { id },
      });
      await course_publication.remove();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
    return {
      message: 'Successfully deleted',
    };
  }
}
