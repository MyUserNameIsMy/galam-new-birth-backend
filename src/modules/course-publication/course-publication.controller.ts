import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CoursePublicationService } from './course-publication.service';
import { CreateCoursePublicationDto } from './dto/create-course-publication.dto';
import { UpdateCoursePublicationDto } from './dto/update-course-publication.dto';
import { CoursePublicationEntity } from './entities/course-publication.entity';
import { ApiTags } from '@nestjs/swagger';
import { CoursePublicationFilterDto } from './dto/course-publication-filter.dto';

@ApiTags('Course publication')
@Controller('course-publication')
export class CoursePublicationController {
  constructor(
    private readonly coursePublicationService: CoursePublicationService,
  ) {}

  @Post()
  async create(@Body() createCoursePublicationDto: CreateCoursePublicationDto) {
    return await this.coursePublicationService.create(
      createCoursePublicationDto,
    );
  }

  @Get()
  async findAll(
    @Query() filter: CoursePublicationFilterDto,
  ): Promise<CoursePublicationEntity[]> {
    return await this.coursePublicationService.findAll(filter);
  }

  @Get('open-recruitment')
  async findAllOpen(
    @Query() filter: CoursePublicationFilterDto,
    @Query('page') page = 0,
    @Query('limit') limit = 5,
  ): Promise<{
    course_publications: CoursePublicationEntity[];
    page: number;
    limit: number;
  }> {
    console.log(filter);
    console.log(page);
    console.log(limit);
    return await this.coursePublicationService.findAllOpen(filter, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CoursePublicationEntity> {
    return await this.coursePublicationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoursePublicationDto: UpdateCoursePublicationDto,
  ): Promise<{ message: string }> {
    return await this.coursePublicationService.updateStatus(
      +id,
      updateCoursePublicationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.coursePublicationService.remove(+id);
  }

  @Delete(':id/schedule')
  async removeSchedule(@Param('id') id: string): Promise<{ message: string }> {
    return await this.coursePublicationService.removeSchedule(+id);
  }
}
