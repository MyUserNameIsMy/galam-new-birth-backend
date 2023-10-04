import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursePublicationService } from './course-publication.service';
import { CreateCoursePublicationDto } from './dto/create-course-publication.dto';
import { UpdateCoursePublicationDto } from './dto/update-course-publication.dto';

@Controller('course-publication')
export class CoursePublicationController {
  constructor(private readonly coursePublicationService: CoursePublicationService) {}

  @Post()
  create(@Body() createCoursePublicationDto: CreateCoursePublicationDto) {
    return this.coursePublicationService.create(createCoursePublicationDto);
  }

  @Get()
  findAll() {
    return this.coursePublicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursePublicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoursePublicationDto: UpdateCoursePublicationDto) {
    return this.coursePublicationService.update(+id, updateCoursePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursePublicationService.remove(+id);
  }
}
