import { Injectable } from '@nestjs/common';
import { CreateCoursePublicationDto } from './dto/create-course-publication.dto';
import { UpdateCoursePublicationDto } from './dto/update-course-publication.dto';

@Injectable()
export class CoursePublicationService {
  create(createCoursePublicationDto: CreateCoursePublicationDto) {
    return 'This action adds a new coursePublication';
  }

  findAll() {
    return `This action returns all coursePublication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coursePublication`;
  }

  update(id: number, updateCoursePublicationDto: UpdateCoursePublicationDto) {
    return `This action updates a #${id} coursePublication`;
  }

  remove(id: number) {
    return `This action removes a #${id} coursePublication`;
  }
}
