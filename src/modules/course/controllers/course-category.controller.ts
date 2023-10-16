import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCourseCategoryDto } from '../dto/create-course-category.dto';
import { CourseCategoryService } from '../services/course-category.service';

@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}

  @Post()
  async create(@Body() createCourseCategoryDto: CreateCourseCategoryDto) {
    return this.courseCategoryService.create(createCourseCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.courseCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseCategoryService.findOne(+id);
  }
}
