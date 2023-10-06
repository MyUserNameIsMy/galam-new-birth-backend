import { ApiProperty } from '@nestjs/swagger';
import { CoursePublicationStatusEnum } from '../../../common/enums/course-publication-status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateCoursePublicationStatusDto {
  @ApiProperty({ description: 'Course Publication status' })
  @IsNotEmpty()
  @IsEnum(CoursePublicationStatusEnum)
  status: CoursePublicationStatusEnum;
}
