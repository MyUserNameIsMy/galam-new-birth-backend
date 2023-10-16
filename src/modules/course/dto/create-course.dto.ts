import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CourseTypeEnum } from '../../../common/enums/course-type.enum';

export class CreateCourseDto {
  @ApiProperty({ description: 'Name of the Course' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Teacher of the Course' })
  @IsNotEmpty()
  @IsString()
  teacher: string;

  @ApiProperty({ description: 'Hour per week of the Course' })
  @IsNotEmpty()
  @IsNumber()
  hour_per_week: number;

  @ApiProperty({ description: 'Description of the Course' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Requirements of the Course' })
  @IsNotEmpty()
  @IsString()
  requirements: string;

  @ApiProperty({ description: 'Syllabus of the Course' })
  @IsNotEmpty()
  @IsString()
  syllabus: string;

  @ApiProperty({ description: 'Course Type' })
  @IsNotEmpty()
  @IsEnum(CourseTypeEnum)
  course_type: CourseTypeEnum;

  @ApiProperty({ description: 'Organization Id' })
  @IsNotEmpty()
  @IsNumber()
  organization_id: number;

  @ApiProperty({ description: 'Course Categroy' })
  @IsNotEmpty()
  @IsNumber()
  course_category_id: number;
}
