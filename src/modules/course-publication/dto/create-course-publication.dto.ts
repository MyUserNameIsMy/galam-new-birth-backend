import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { WeekDayEnum } from '../../../common/enums/week-day.enum';

export class CreateCoursePublicationDto {
  @ApiProperty({ description: 'Start date of Course' })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  start_date: Date;

  @ApiProperty({ description: 'End date of Course' })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  end_date: Date;

  @ApiProperty({ description: 'Capacity of Course' })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty({ description: 'Course Id' })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @ApiProperty()
  @Type(() => LessonDto)
  lessons_per_week: LessonDto[];
}

export class LessonDto {
  @ApiProperty({ description: 'Week day' })
  @IsNotEmpty()
  @IsEnum(WeekDayEnum)
  week_day: WeekDayEnum;

  @ApiProperty({ description: 'Lesson Slots' })
  @IsNotEmpty()
  time_slots: TimeSlotDto[];

  @ApiProperty({ description: 'Room' })
  @IsNotEmpty()
  @IsString()
  room: string;
}

export class TimeSlotDto {
  @ApiProperty({
    description: 'Start Time of the Working day',
    example: '11:00',
  })
  @IsNotEmpty()
  @IsMilitaryTime()
  start_time: string;

  @ApiProperty({
    description: 'End Time of the Working day',
    example: '12:00',
  })
  @IsNotEmpty()
  @IsMilitaryTime()
  end_time: string;
}
