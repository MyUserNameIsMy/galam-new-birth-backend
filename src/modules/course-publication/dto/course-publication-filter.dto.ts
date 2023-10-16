import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { WeekDayEnum } from '../../../common/enums/week-day.enum';

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
}
