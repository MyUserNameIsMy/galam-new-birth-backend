import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

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
}
