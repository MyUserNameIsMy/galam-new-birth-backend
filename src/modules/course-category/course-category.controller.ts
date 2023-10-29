import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCourseCategoryDto } from '../course/dto/create-course-category.dto';
import { CourseCategoryService } from './course-category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Category')
@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}

  @Post('seed')
  async seed(): Promise<{ message: string }> {
    return this.courseCategoryService.seed();
  }

  @Get('tree')
  async findAll() {
    return await this.courseCategoryService.findAllTree();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseCategoryService.findOne(+id);
  }
}
