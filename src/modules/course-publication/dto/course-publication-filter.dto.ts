import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { WeekDayEnum } from '../../../common/enums/week-day.enum';
import { CourseTypeEnum } from '../../../common/enums/course-type.enum';

export class CoursePublicationFilterDto {
  @ApiProperty({ description: 'City Ids' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((id) => Number(id)),
  )
  city_ids?: number[];

  @ApiProperty({ description: 'Course category Ids' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((id) => Number(id)),
  )
  course_category_ids?: number[];

  @ApiProperty({ description: 'Week days' })
  @IsOptional()
  @IsEnum(WeekDayEnum, { each: true })
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((id) => Number(id)),
  )
  week_days?: WeekDayEnum[];

  @ApiProperty({ description: 'Course types' })
  @IsOptional()
  @IsEnum(CourseTypeEnum, { each: true })
  @Transform(({ value }) => value.trim().split(','))
  course_types?: CourseTypeEnum[];
}
